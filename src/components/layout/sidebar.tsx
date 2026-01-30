"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  MessageSquare,
  Settings,
  Users,
  BarChart3,
  FileText,
  Award,
  Calendar,
  ClipboardList,
  Cog,
  Key,
  GraduationCap,
} from "lucide-react";
import type { RoleName } from "@prisma/client";

interface SidebarProps {
  role: RoleName;
}

const learnerNav = [
  { name: "Dashboard", href: "/learner", icon: LayoutDashboard },
  { name: "My Courses", href: "/learner/courses", icon: BookOpen },
  { name: "Progress", href: "/learner/progress", icon: BarChart3 },
  { name: "Achievements", href: "/learner/achievements", icon: Trophy },
  { name: "Calendar", href: "/learner/calendar", icon: Calendar },
  { name: "Messages", href: "/learner/messages", icon: MessageSquare },
  { name: "Settings", href: "/learner/settings", icon: Settings },
];

const trainerNav = [
  { name: "Dashboard", href: "/trainer", icon: LayoutDashboard },
  { name: "My Classes", href: "/trainer/classes", icon: GraduationCap },
  { name: "Grading", href: "/trainer/grading", icon: ClipboardList },
  { name: "Materials", href: "/trainer/materials", icon: FileText },
  { name: "Students", href: "/trainer/students", icon: Users },
  { name: "Calendar", href: "/trainer/calendar", icon: Calendar },
  { name: "Messages", href: "/trainer/messages", icon: MessageSquare },
  { name: "Settings", href: "/trainer/settings", icon: Settings },
];

const adminNav = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Courses", href: "/admin/courses", icon: BookOpen },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Enrollments", href: "/admin/enrollments", icon: Award },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const superadminNav = [
  { name: "Dashboard", href: "/superadmin", icon: LayoutDashboard },
  { name: "System Settings", href: "/superadmin/settings", icon: Cog },
  { name: "API Keys", href: "/superadmin/api-keys", icon: Key },
  { name: "Users", href: "/superadmin/users", icon: Users },
  { name: "Analytics", href: "/superadmin/analytics", icon: BarChart3 },
  { name: "Courses", href: "/superadmin/courses", icon: BookOpen },
];

const getNavigation = (role: RoleName) => {
  switch (role) {
    case "SUPERADMIN":
      return superadminNav;
    case "ADMIN":
      return adminNav;
    case "TRAINER":
      return trainerNav;
    default:
      return learnerNav;
  }
};

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const navigation = getNavigation(role);

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <GraduationCap className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold">LearnHub</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== `/${role.toLowerCase()}` &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Role indicator */}
      <div className="border-t p-4">
        <div className="rounded-lg bg-muted px-3 py-2 text-center text-xs font-medium text-muted-foreground">
          {role.charAt(0) + role.slice(1).toLowerCase()} Mode
        </div>
      </div>
    </aside>
  );
}
