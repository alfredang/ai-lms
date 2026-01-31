import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clock, Users, BarChart3, Star } from "lucide-react";

async function getCourses() {
  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    include: {
      category: true,
      createdBy: {
        select: { name: true },
      },
      classes: {
        where: { isActive: true },
        select: {
          _count: {
            select: { enrollments: true },
          },
        },
      },
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  return courses;
}

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

const difficultyColors: Record<string, string> = {
  BEGINNER: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  INTERMEDIATE: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  ADVANCED: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  EXPERT: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const [courses, categories] = await Promise.all([getCourses(), getCategories()]);

  const filteredCourses = params.category
    ? courses.filter((c) => c.category.slug === params.category)
    : courses;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Explore Our Courses
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Discover comprehensive training programs designed to advance your career
          in real estate and beyond.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        <Link href="/courses">
          <Badge
            variant={!params.category ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 text-sm"
          >
            All Courses
          </Badge>
        </Link>
        {categories.map((category) => (
          <Link key={category.id} href={`/courses?category=${category.slug}`}>
            <Badge
              variant={params.category === category.slug ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm"
            >
              {category.name}
            </Badge>
          </Link>
        ))}
      </div>

      {/* Course Grid */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => {
          const totalEnrollments = course.classes.reduce(
            (sum, c) => sum + c._count.enrollments,
            0
          );

          return (
            <Card key={course.id} className="group flex flex-col overflow-hidden">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5">
                {course.isFeatured && (
                  <Badge className="absolute left-3 top-3 bg-yellow-500">
                    <Star className="mr-1 h-3 w-3" />
                    Featured
                  </Badge>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary/20">
                    {course.title.charAt(0)}
                  </span>
                </div>
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {course.category.name}
                  </Badge>
                  <Badge className={difficultyColors[course.difficulty]}>
                    {course.difficulty}
                  </Badge>
                </div>
                <h3 className="mt-2 text-xl font-semibold group-hover:text-primary">
                  {course.title}
                </h3>
              </CardHeader>

              <CardContent className="flex-1">
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {course.description}
                </p>

                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {Math.floor(course.duration / 60)}h {course.duration % 60}m
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {totalEnrollments} enrolled
                  </div>
                </div>

                {course.tags && course.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {(course.tags as string[]).slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>

              <CardFooter className="border-t pt-4">
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    By {course.createdBy.name}
                  </span>
                  <Button asChild size="sm">
                    <Link href={`/courses/${course.slug}`}>View Course</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="mt-16 text-center">
          <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No courses found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {params.category
              ? "No courses in this category yet. Check back soon!"
              : "Courses will be available soon."}
          </p>
          {params.category && (
            <Button asChild className="mt-4">
              <Link href="/courses">View All Courses</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
