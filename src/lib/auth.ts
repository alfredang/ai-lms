import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import type { RoleName } from "@prisma/client";
import type { Adapter } from "next-auth/adapters";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({
      // Always show Google's account chooser (users have personal + work accounts).
      authorization: { params: { prompt: "select_account" } },
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: { role: true },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role.name,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // For OAuth providers, ensure user has a role
      if (account?.provider !== "credentials") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: { role: true },
        });

        if (!existingUser) {
          // Get default LEARNER role
          let learnerRole = await prisma.role.findUnique({
            where: { name: "LEARNER" },
          });

          if (!learnerRole) {
            learnerRole = await prisma.role.create({
              data: {
                name: "LEARNER",
                description: "Default learner role",
              },
            });
          }

          // Create user with role
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
              image: user.image,
              roleId: learnerRole.id,
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
      }

      // Handle session updates
      if (trigger === "update" && session) {
        token.name = session.name;
        token.image = session.image;
      }

      // Fetch role if not present
      if (!token.role && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          include: { role: true },
        });
        if (dbUser) {
          token.role = dbUser.role.name;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as RoleName;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // Create gamification profile for new users
      await prisma.gamificationProfile.create({
        data: {
          userId: user.id!,
        },
      });
    },
  },
});

// Helper to get session in server components
export async function getSession() {
  return await auth();
}

// Helper to check if user has required role
export function hasRole(userRole: RoleName, requiredRoles: RoleName[]): boolean {
  const roleHierarchy: Record<RoleName, number> = {
    LEARNER: 1,
    TRAINER: 2,
    ADMIN: 3,
    SUPERADMIN: 4,
  };

  return requiredRoles.some(
    (role) => roleHierarchy[userRole] >= roleHierarchy[role]
  );
}
