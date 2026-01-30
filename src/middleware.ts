import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { RoleName } from "@prisma/client";

// Routes that require specific roles
const roleRoutes: Record<string, RoleName[]> = {
  "/learner": ["LEARNER", "TRAINER", "ADMIN", "SUPERADMIN"],
  "/trainer": ["TRAINER", "ADMIN", "SUPERADMIN"],
  "/admin": ["ADMIN", "SUPERADMIN"],
  "/superadmin": ["SUPERADMIN"],
};

// Public routes that don't require authentication
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/courses",
  "/about",
  "/contact",
];

// Routes that should redirect authenticated users
const authRoutes = ["/login", "/register"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role as RoleName | undefined;
  const pathname = nextUrl.pathname;

  // Check if route is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check if route is auth route (login/register)
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // API routes are handled separately
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Static files
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && isLoggedIn) {
    const redirectPath = getDashboardPath(userRole!);
    return NextResponse.redirect(new URL(redirectPath, nextUrl));
  }

  // Allow public routes
  if (isPublicRoute && !isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  // Require authentication for protected routes
  if (!isLoggedIn) {
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }

  // Check role-based access
  for (const [routePrefix, allowedRoles] of Object.entries(roleRoutes)) {
    if (pathname.startsWith(routePrefix)) {
      if (!userRole || !allowedRoles.includes(userRole)) {
        // Redirect to user's appropriate dashboard
        const redirectPath = getDashboardPath(userRole!);
        return NextResponse.redirect(new URL(redirectPath, nextUrl));
      }
      break;
    }
  }

  return NextResponse.next();
});

function isProtectedRoute(pathname: string): boolean {
  return Object.keys(roleRoutes).some((route) => pathname.startsWith(route));
}

function getDashboardPath(role: RoleName): string {
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
