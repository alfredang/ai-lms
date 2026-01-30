import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

type RoleName = "LEARNER" | "TRAINER" | "ADMIN" | "SUPERADMIN";

// Routes that require specific roles
const roleRoutes: Record<string, RoleName[]> = {
  "/learner": ["LEARNER", "TRAINER", "ADMIN", "SUPERADMIN"],
  "/trainer": ["TRAINER", "ADMIN", "SUPERADMIN"],
  "/admin": ["ADMIN", "SUPERADMIN"],
  "/superadmin": ["SUPERADMIN"],
};

// Public routes that don't require authentication
const publicRoutes = ["/", "/login", "/register", "/courses", "/about", "/contact"];

// Routes that should redirect authenticated users
const authRoutes = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Get JWT token
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isLoggedIn = !!token;
  const userRole = token?.role as RoleName | undefined;

  // Check route types
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = Object.keys(roleRoutes).some((route) =>
    pathname.startsWith(route)
  );

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && isLoggedIn) {
    const redirectPath = getDashboardPath(userRole);
    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  // Allow public routes
  if (isPublicRoute && !isProtectedRoute) {
    return NextResponse.next();
  }

  // Require authentication for protected routes
  if (!isLoggedIn && isProtectedRoute) {
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, req.url));
  }

  // Check role-based access
  if (isLoggedIn && isProtectedRoute) {
    for (const [routePrefix, allowedRoles] of Object.entries(roleRoutes)) {
      if (pathname.startsWith(routePrefix)) {
        if (!userRole || !allowedRoles.includes(userRole)) {
          const redirectPath = getDashboardPath(userRole);
          return NextResponse.redirect(new URL(redirectPath, req.url));
        }
        break;
      }
    }
  }

  return NextResponse.next();
}

function getDashboardPath(role: RoleName | undefined): string {
  switch (role) {
    case "SUPERADMIN":
      return "/superadmin";
    case "ADMIN":
      return "/admin";
    case "TRAINER":
      return "/trainer";
    case "LEARNER":
    default:
      return "/learner";
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
