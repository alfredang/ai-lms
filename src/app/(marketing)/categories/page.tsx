import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Home,
  TrendingUp,
  MessageSquare,
  Bot,
  Code2,
  Cloud,
  Megaphone,
  BookOpen,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

// Force dynamic rendering to avoid database access at build time
export const dynamic = "force-dynamic";

const categoryIcons: Record<string, { color: string; bgColor: string; icon: LucideIcon }> = {
  "real-estate": { color: "text-emerald-400", bgColor: "bg-emerald-500/20", icon: Home },
  "investment": { color: "text-green-400", bgColor: "bg-green-500/20", icon: TrendingUp },
  "soft-skills": { color: "text-amber-400", bgColor: "bg-amber-500/20", icon: MessageSquare },
  "gen-ai-agentic-ai": { color: "text-purple-400", bgColor: "bg-purple-500/20", icon: Bot },
  "full-stack-vibe-coding": { color: "text-cyan-400", bgColor: "bg-cyan-500/20", icon: Code2 },
  "cloud-computing": { color: "text-blue-400", bgColor: "bg-blue-500/20", icon: Cloud },
  "digital-marketing": { color: "text-pink-400", bgColor: "bg-pink-500/20", icon: Megaphone },
};

async function getCategories() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { courses: true },
      },
      courses: {
        where: { isPublished: true },
        take: 3,
        select: {
          id: true,
          title: true,
          slug: true,
          difficulty: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });

  return categories;
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Course Categories
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Explore our diverse range of learning paths and find the perfect
          courses to advance your skills.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const iconConfig = categoryIcons[category.slug];
          const Icon = iconConfig?.icon || BookOpen;
          const iconColor = iconConfig?.color || "text-gray-400";
          const iconBgColor = iconConfig?.bgColor || "bg-gray-500/20";

          return (
            <Card key={category.id} className="group relative overflow-hidden transition-all hover:shadow-lg hover:border-primary">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${iconBgColor} transition-colors`}>
                    <Icon className={`h-7 w-7 ${iconColor}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{category.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {category._count.courses} course
                      {category._count.courses !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {category.description && (
                  <p className="mb-4 text-sm text-muted-foreground">
                    {category.description}
                  </p>
                )}

                {category.courses.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Popular Courses
                    </p>
                    {category.courses.map((course) => (
                      <Link
                        key={course.id}
                        href={`/courses/${course.slug}`}
                        className="flex items-center justify-between rounded-lg border p-2 text-sm transition-colors hover:bg-accent"
                      >
                        <span className="font-medium">{course.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {course.difficulty}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Courses coming soon
                  </p>
                )}

                <Link
                  href={`/courses?category=${category.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  View all courses
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="mt-16 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No categories yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Check back soon for new learning categories.
          </p>
        </div>
      )}
    </div>
  );
}
