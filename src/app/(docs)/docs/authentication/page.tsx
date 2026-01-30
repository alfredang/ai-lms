import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthenticationPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Badge variant="outline" className="mb-4">
          Security
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">Authentication</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          LearnHub uses NextAuth v5 for secure, flexible authentication with support
          for OAuth providers and credentials-based login.
        </p>
      </div>

      {/* NextAuth Setup */}
      <section id="nextauth">
        <h2 className="text-2xl font-bold">NextAuth Configuration</h2>
        <p className="mt-2 text-muted-foreground">
          Authentication is configured in <code className="rounded bg-muted px-1.5 py-0.5">src/lib/auth.ts</code>.
        </p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Key Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
              <code>{`// src/lib/auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({ ... }),
    GitHub({ ... }),
    Credentials({ ... }),
  ],
  callbacks: {
    async jwt({ token, user }) { ... },
    async session({ session, token }) { ... },
  },
});`}</code>
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* OAuth Providers */}
      <section id="oauth">
        <h2 className="text-2xl font-bold">OAuth Providers</h2>
        <p className="mt-2 text-muted-foreground">
          Configure Google and GitHub OAuth for social login.
        </p>

        <div className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Google OAuth Setup</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ol className="list-decimal list-inside space-y-2">
                <li>Go to <a href="https://console.cloud.google.com" className="text-primary hover:underline">Google Cloud Console</a></li>
                <li>Create a new project or select existing</li>
                <li>Enable Google+ API</li>
                <li>Create OAuth 2.0 credentials</li>
                <li>Add authorized redirect URI: <code className="rounded bg-muted px-1.5 py-0.5">https://your-domain.com/api/auth/callback/google</code></li>
                <li>Copy Client ID and Secret to environment variables</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">GitHub OAuth Setup</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ol className="list-decimal list-inside space-y-2">
                <li>Go to <a href="https://github.com/settings/developers" className="text-primary hover:underline">GitHub Developer Settings</a></li>
                <li>Click &quot;New OAuth App&quot;</li>
                <li>Set Homepage URL to your domain</li>
                <li>Set Authorization callback URL: <code className="rounded bg-muted px-1.5 py-0.5">https://your-domain.com/api/auth/callback/github</code></li>
                <li>Copy Client ID and Secret to environment variables</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Credentials */}
      <section id="credentials">
        <h2 className="text-2xl font-bold">Credentials Authentication</h2>
        <p className="mt-2 text-muted-foreground">
          Email/password authentication using bcrypt for secure password hashing.
        </p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Credentials Provider</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
              <code>{`Credentials({
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
      include: { role: true },
    });

    if (!user?.password) return null;

    const isValid = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isValid) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role.name,
    };
  },
})`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Password Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Minimum 8 characters</li>
              <li>Hashed using bcrypt with 12 rounds</li>
              <li>Stored securely in database</li>
              <li>Never transmitted in plain text</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
