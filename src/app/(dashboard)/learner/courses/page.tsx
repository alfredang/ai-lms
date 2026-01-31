import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Play,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

async function getEnrolledCourses(userId: string) {
  const enrollments = await prisma.enrollment.findMany({
    where: {
      userId,
      status: "ACTIVE",
    },
    include: {
      class: {
        include: {
          course: {
            include: {
              category: true,
            },
          },
          lessons: {
            orderBy: { order: "asc" },
            select: { id: true, title: true },
          },
        },
      },
      lessonProgress: {
        where: { isCompleted: true },
        select: { lessonId: true },
      },
    },
    orderBy: { enrolledAt: "desc" },
  });

  return enrollments;
}

export default async function LearnerCoursesPage() {
  const session = await auth();
  if (!session?.user) return null;

  const enrollments = await getEnrolledCourses(session.user.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">
            Continue learning where you left off
          </p>
        </div>
        <Button asChild>
          <Link href="/courses">
            Browse More Courses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {enrollments.map((enrollment) => {
          const totalLessons = enrollment.class.lessons.length;
          const completedLessons = enrollment.lessonProgress.length;
          const progressPercent =
            totalLessons > 0
              ? Math.round((completedLessons / totalLessons) * 100)
              : 0;

          // Find next lesson to continue
          const completedLessonIds = new Set(
            enrollment.lessonProgress.map((lp) => lp.lessonId)
          );
          const nextLesson = enrollment.class.lessons.find(
            (lesson) => !completedLessonIds.has(lesson.id)
          );

          return (
            <Card key={enrollment.id} className="flex flex-col">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5">
                {progressPercent === 100 && (
                  <Badge className="absolute left-3 top-3 bg-green-500">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Completed
                  </Badge>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary/20">
                    {enrollment.class.course.title.charAt(0)}
                  </span>
                </div>
              </div>

              <CardHeader className="pb-2">
                <Badge variant="secondary" className="w-fit text-xs">
                  {enrollment.class.course.category.name}
                </Badge>
                <CardTitle className="text-lg">
                  {enrollment.class.course.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {enrollment.class.name}
                </p>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{progressPercent}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {completedLessons} of {totalLessons} lessons completed
                  </p>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {Math.floor(enrollment.class.course.duration / 60)}h{" "}
                    {enrollment.class.course.duration % 60}m
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {totalLessons} lessons
                  </div>
                </div>
              </CardContent>

              <div className="border-t p-4">
                <Button className="w-full" asChild>
                  <Link
                    href={`/learner/courses/${enrollment.class.course.slug}`}
                  >
                    {progressPercent === 100 ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Review Course
                      </>
                    ) : nextLesson ? (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Continue Learning
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Start Course
                      </>
                    )}
                  </Link>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {enrollments.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No courses yet</h3>
            <p className="text-sm text-muted-foreground">
              You haven&apos;t enrolled in any courses. Browse our catalog to
              get started.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
