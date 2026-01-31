import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  BookOpen,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  Clock,
} from "lucide-react";
import Link from "next/link";

async function getCourses() {
  const courses = await prisma.course.findMany({
    include: {
      category: true,
      createdBy: { select: { name: true, email: true } },
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
  return courses;
}

export default async function SuperadminCoursesPage() {
  const session = await auth();
  if (!session?.user) return null;

  const courses = await getCourses();

  const difficultyColors: Record<string, string> = {
    BEGINNER: "bg-green-500",
    INTERMEDIATE: "bg-yellow-500",
    ADVANCED: "bg-orange-500",
    EXPERT: "bg-red-500",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/superadmin">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Course Management</h1>
          <p className="text-muted-foreground">
            Manage all courses on the platform
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Course
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">All Categories</Button>
              <Button variant="outline">All Difficulty</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            All Courses ({courses.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses.map((course) => {
              const totalEnrollments = course.classes.reduce(
                (sum, cls) => sum + cls._count.enrollments,
                0
              );

              return (
                <div
                  key={course.id}
                  className="flex items-center gap-4 rounded-lg border p-4"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{course.title}</p>
                      {course.isPublished ? (
                        <Badge className="bg-green-500">Published</Badge>
                      ) : (
                        <Badge variant="secondary">Draft</Badge>
                      )}
                      <Badge className={difficultyColors[course.difficulty]}>
                        {course.difficulty}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                      {course.description}
                    </p>
                    <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {Math.floor(course.duration / 60)}h {course.duration % 60}m
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {totalEnrollments} enrolled
                      </span>
                      <span>{course.classes.length} classes</span>
                      <span>Category: {course.category.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/courses/${course.slug}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              );
            })}

            {courses.length === 0 && (
              <div className="py-8 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">
                  No courses found
                </p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Course
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
