"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Rocket,
  Download,
  Shield,
  Database,
  Users,
  Trophy,
  Bot,
  Code,
  Cloud,
  GraduationCap,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: { name: string; href: string }[];
}

const docsNavigation: NavItem[] = [
  {
    name: "Getting Started",
    href: "/docs/getting-started",
    icon: Rocket,
    children: [
      { name: "Introduction", href: "/docs/getting-started" },
      { name: "Quick Start", href: "/docs/getting-started#quick-start" },
      { name: "Demo Accounts", href: "/docs/getting-started#demo-accounts" },
    ],
  },
  {
    name: "Installation",
    href: "/docs/installation",
    icon: Download,
    children: [
      { name: "Prerequisites", href: "/docs/installation#prerequisites" },
      { name: "Local Setup", href: "/docs/installation#local-setup" },
      { name: "Environment Variables", href: "/docs/installation#environment" },
    ],
  },
  {
    name: "Authentication",
    href: "/docs/authentication",
    icon: Shield,
    children: [
      { name: "NextAuth Setup", href: "/docs/authentication#nextauth" },
      { name: "OAuth Providers", href: "/docs/authentication#oauth" },
      { name: "Credentials", href: "/docs/authentication#credentials" },
    ],
  },
  {
    name: "Database",
    href: "/docs/database",
    icon: Database,
    children: [
      { name: "Schema Overview", href: "/docs/database#schema" },
      { name: "Prisma ORM", href: "/docs/database#prisma" },
      { name: "Neon Setup", href: "/docs/database#neon" },
    ],
  },
  {
    name: "Roles & Permissions",
    href: "/docs/roles",
    icon: Users,
    children: [
      { name: "Role Hierarchy", href: "/docs/roles#hierarchy" },
      { name: "Permissions", href: "/docs/roles#permissions" },
      { name: "Middleware", href: "/docs/roles#middleware" },
    ],
  },
  {
    name: "Gamification",
    href: "/docs/gamification",
    icon: Trophy,
    children: [
      { name: "XP System", href: "/docs/gamification#xp" },
      { name: "Levels", href: "/docs/gamification#levels" },
      { name: "Badges", href: "/docs/gamification#badges" },
      { name: "Streaks", href: "/docs/gamification#streaks" },
    ],
  },
  {
    name: "AI Features",
    href: "/docs/ai-features",
    icon: Bot,
    children: [
      { name: "Chat Assistant", href: "/docs/ai-features#chat" },
      { name: "Context Injection", href: "/docs/ai-features#context" },
      { name: "Configuration", href: "/docs/ai-features#config" },
    ],
  },
  {
    name: "API Reference",
    href: "/docs/api",
    icon: Code,
    children: [
      { name: "Authentication", href: "/docs/api#auth" },
      { name: "Courses", href: "/docs/api#courses" },
      { name: "Enrollments", href: "/docs/api#enrollments" },
    ],
  },
  {
    name: "Deployment",
    href: "/docs/deployment",
    icon: Cloud,
    children: [
      { name: "Vercel", href: "/docs/deployment#vercel" },
      { name: "Database (Neon)", href: "/docs/deployment#neon" },
      { name: "Environment", href: "/docs/deployment#environment" },
    ],
  },
];

function NavSection({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
  const [isOpen, setIsOpen] = useState(isActive);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-accent hover:text-foreground"
        )}
      >
        <div className="flex items-center gap-3">
          <item.icon className="h-5 w-5" />
          {item.name}
        </div>
        {item.children && (
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        )}
      </button>
      {item.children && isOpen && (
        <div className="ml-8 mt-1 space-y-1">
          {item.children.map((child) => {
            const childActive = pathname === child.href.split("#")[0];
            return (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "block rounded-lg px-3 py-1.5 text-sm transition-colors",
                  childActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {child.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function DocsSidebar() {
  return (
    <aside className="flex h-full w-64 flex-col border-r bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">LearnHub</span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Docs Title */}
      <div className="border-b px-6 py-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          Documentation
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {docsNavigation.map((item) => (
          <NavSection key={item.href} item={item} />
        ))}
      </nav>

      {/* Back to App */}
      <div className="border-t p-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          Back to App
        </Link>
      </div>
    </aside>
  );
}
