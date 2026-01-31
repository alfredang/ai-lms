import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  CheckCircle,
  Play,
  Lock,
  FileText,
  ArrowLeft,
  Users,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCourseWithProgress(slug: string, userId: string) {
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      category: true,
      createdBy: { select: { name: true } },
      classes: {
        where: {
          isActive: true,
          enrollments: {
            some: { userId },
          },
        },
        include: {
          trainer: { select: { name: true } },
          lessons: {
            where: { isPublished: true },
            orderBy: { order: "asc" },
            include: {
              materials: {
                orderBy: { order: "asc" },
              },
              assignments: {
                where: { isPublished: true },
              },
            },
          },
          enrollments: {
            where: { userId },
            include: {
              lessonProgress: true,
            },
          },
        },
      },
    },
  });

  return course;
}

export default async function LearnerCourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const course = await getCourseWithProgress(slug, session.user.id);

  if (!course) {
    notFound();
  }

  // Get the user's enrolled class
  const enrolledClass = course.classes[0];
  if (!enrolledClass) {
    // User is not enrolled, redirect to course catalog
    redirect(`/courses/${slug}`);
  }

  const enrollment = enrolledClass.enrollments[0];
  const completedLessonIds = new Set(
    enrollment?.lessonProgress
      .filter((lp) => lp.isCompleted)
      .map((lp) => lp.lessonId) || []
  );

  const totalLessons = enrolledClass.lessons.length;
  const completedLessons = completedLessonIds.size;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/learner/courses">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <Badge variant="secondary" className="mb-2">
            {course.category.name}
          </Badge>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground">{enrolledClass.name}</p>
        </div>
      </div>

      {/* Course Info */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About This Course</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{course.description}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {Math.floor(course.duration / 60)}h {course.duration % 60}m
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>{totalLessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Trainer: {enrolledClass.trainer.name}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lessons */}
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {enrolledClass.lessons.map((lesson, index) => {
                  const isCompleted = completedLessonIds.has(lesson.id);
                  const isLocked = false; // Could implement sequential unlocking

                  return (
                    <Link
                      key={lesson.id}
                      href={`/learner/courses/${slug}/lessons/${lesson.id}`}
                      className={`flex items-center gap-4 rounded-lg border p-4 transition-colors ${
                        isLocked
                          ? "cursor-not-allowed opacity-50"
                          : "hover:bg-accent"
                      }`}
                    >
                      {/* Status Icon */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          isCompleted
                            ? "bg-green-500/10 text-green-500"
                            : isLocked
                            ? "bg-muted text-muted-foreground"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : isLocked ? (
                          <Lock className="h-5 w-5" />
                        ) : (
                          <span className="text-sm font-medium">
                            {index + 1}
                          </span>
                        )}
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1">
                        <h4 className="font-medium">{lesson.title}</h4>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {lesson.duration} min
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {lesson.materials.length} materials
                          </span>
                          {lesson.assignments.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {lesson.assignments.length} assignment
                              {lesson.assignments.length !== 1 ? "s" : ""}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Action */}
                      {!isLocked && (
                        <Button
                          size="sm"
                          variant={isCompleted ? "outline" : "default"}
                        >
                          {isCompleted ? "Review" : "Start"}
                          <Play className="ml-1 h-3 w-3" />
                        </Button>
                      )}
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">
                  {progressPercent}%
                </div>
                <p className="text-sm text-muted-foreground">Complete</p>
              </div>

              <Progress value={progressPercent} className="h-3" />

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {completedLessons} completed
                </span>
                <span className="text-muted-foreground">
                  {totalLessons - completedLessons} remaining
                </span>
              </div>

              {progressPercent < 100 && (
                <Button className="w-full" asChild>
                  <Link
                    href={`/learner/courses/${slug}/lessons/${
                      enrolledClass.lessons.find(
                        (l) => !completedLessonIds.has(l.id)
                      )?.id || enrolledClass.lessons[0]?.id
                    }`}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Continue Learning
                  </Link>
                </Button>
              )}

              {progressPercent === 100 && (
                <div className="rounded-lg bg-green-500/10 p-4 text-center">
                  <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
                  <p className="mt-2 font-medium text-green-500">
                    Course Completed!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Course Info */}
          <Card>
            <CardHeader>
              <CardTitle>Course Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Difficulty</span>
                <Badge variant="outline">{course.difficulty}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span>
                  {Math.floor(course.duration / 60)}h {course.duration % 60}m
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lessons</span>
                <span>{totalLessons}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trainer</span>
                <span>{enrolledClass.trainer.name}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
