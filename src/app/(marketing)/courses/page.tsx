import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Clock, BarChart3, Star, User, GraduationCap, Monitor, Users, Video, Building } from "lucide-react";

// Force dynamic rendering to avoid database access at build time
export const dynamic = "force-dynamic";

const levelColors: Record<string, string> = {
  BEGINNER: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  INTERMEDIATE: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  ADVANCED: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  EXPERT: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const categoryIcons: Record<string, string> = {
  "gen-ai-agentic-ai": "🤖",
  "full-stack-vibe-coding": "💻",
  "investment": "📈",
  "soft-skills": "🎯",
  "digital-marketing": "📣",
  "real-estate": "🏠",
  "cloud-computing": "☁️",
};

const deliveryLabels: Record<string, string> = {
  INSTRUCTOR_LED: "Instructor-Led",
  E_LEARNING: "E-Learning",
};

const sessionLabels: Record<string, string> = {
  CLASSROOM: "Classroom",
  VIRTUAL: "Virtual",
};

async function getCourses(categorySlug?: string, searchQuery?: string) {
  const courses = await prisma.course.findMany({
    where: {
      isPublished: true,
      ...(categorySlug && { category: { slug: categorySlug } }),
      ...(searchQuery && {
        OR: [
          { title: { contains: searchQuery, mode: "insensitive" } },
          { description: { contains: searchQuery, mode: "insensitive" } },
        ],
      }),
    },
    include: {
      category: true,
      createdBy: {
        select: { name: true },
      },
      classes: {
        include: {
          _count: {
            select: { enrollments: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return courses.map((course) => {
    const totalStudents = course.classes.reduce(
      (acc, cls) => acc + cls._count.enrollments,
      0
    );
    return {
      id: course.id,
      title: course.title,
      slug: course.slug,
      description: course.description,
      category: course.category.name,
      categorySlug: course.category.slug,
      instructor: course.createdBy.name || "Unknown",
      rating: 4.8, // TODO: Add ratings to schema
      students: totalStudents,
      price: course.price ? Number(course.price) : 0,
      thumbnail: course.thumbnail,
      level: course.difficulty,
      duration: `${course.duration} mins`,
      deliveryFormat: course.deliveryFormat || "E_LEARNING",
      sessionType: course.sessionType || "VIRTUAL",
    };
  });
}

async function getCategories() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { courses: { where: { isPublished: true } } },
      },
    },
  });
  return categories;
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const [courses, categories] = await Promise.all([
    getCourses(params.category, params.search),
    getCategories(),
  ]);

  const currentCategory = categories.find((c) => c.slug === params.category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {params.search
            ? `Search Results for "${params.search}"`
            : currentCategory
              ? currentCategory.name
              : "Explore Our Courses"}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {params.search
            ? `Found ${courses.length} course${courses.length !== 1 ? "s" : ""} matching your search.`
            : currentCategory
              ? `Discover our top ${currentCategory.name.toLowerCase()} courses designed by industry experts.`
              : "Discover comprehensive training programs designed to advance your career."}
        </p>
      </div>

      {/* Category Filter */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/courses">
          <Badge
            variant={!params.category ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground"
          >
            All Courses
          </Badge>
        </Link>
        {categories.map((category) => (
          <Link key={category.slug} href={`/courses?category=${category.slug}`}>
            <Badge
              variant={params.category === category.slug ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground"
            >
              <span className="mr-1">{categoryIcons[category.slug] || "📚"}</span>
              {category.name}
              <span className="ml-1 text-xs opacity-70">({category._count.courses})</span>
            </Badge>
          </Link>
        ))}
      </div>

      {/* Course Count */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        Showing {courses.length} course{courses.length !== 1 ? "s" : ""}
        {params.search && ` for "${params.search}"`}
        {currentCategory && ` in ${currentCategory.name}`}
      </div>

      {/* Course Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="group flex flex-col overflow-hidden transition-all hover:shadow-lg">
            {/* Thumbnail */}
            <div className="relative h-48 bg-gradient-to-br from-primary/20 to-purple-600/20">
              {course.thumbnail ? (
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <GraduationCap className="h-16 w-16 text-primary/40" />
                </div>
              )}
              <Badge className="absolute left-3 top-3" variant="secondary">
                {course.category}
              </Badge>
              <Badge className={`absolute right-3 top-3 ${levelColors[course.level] || levelColors.BEGINNER}`}>
                {course.level.charAt(0) + course.level.slice(1).toLowerCase()}
              </Badge>
            </div>

            <CardHeader className="pb-2">
              <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary">
                {course.title}
              </h3>
            </CardHeader>

            <CardContent className="flex-1">
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {course.description}
              </p>

              {/* Delivery Format Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge variant="outline" className="text-xs gap-1">
                  {course.deliveryFormat === "INSTRUCTOR_LED" ? (
                    <Users className="h-3 w-3" />
                  ) : (
                    <Monitor className="h-3 w-3" />
                  )}
                  {deliveryLabels[course.deliveryFormat]}
                </Badge>
                <Badge variant="outline" className="text-xs gap-1">
                  {course.sessionType === "CLASSROOM" ? (
                    <Building className="h-3 w-3" />
                  ) : (
                    <Video className="h-3 w-3" />
                  )}
                  {sessionLabels[course.sessionType]}
                </Badge>
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {course.instructor}
              </div>

              <div className="mt-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground">
                    ({course.students.toLocaleString()})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t pt-4">
              <div className="flex w-full items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  {course.price > 0 ? `$${course.price}` : "Free"}
                </span>
                <Button size="sm" className="group-hover:bg-primary" asChild>
                  <Link href={`/courses/${course.slug}`}>
                    Enroll Now
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {courses.length === 0 && (
        <div className="mt-16 text-center">
          <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No courses found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {params.search
              ? `No courses match "${params.search}". Try a different search term.`
              : params.category
                ? "No courses in this category yet. Check back soon!"
                : "Courses will be available soon."}
          </p>
          {(params.category || params.search) && (
            <Button asChild className="mt-4">
              <Link href="/courses">View All Courses</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
