import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  FileText,
  Video,
  Link as LinkIcon,
  BookOpen,
  ClipboardList,
} from "lucide-react";
import { LessonCompleteButton } from "@/components/courses/lesson-complete-button";
import { AssignmentSubmissionForm } from "@/components/courses/assignment-submission-form";

interface PageProps {
  params: Promise<{ slug: string; lessonId: string }>;
}

async function getLessonData(
  slug: string,
  lessonId: string,
  userId: string
) {
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      classes: {
        where: {
          isActive: true,
          enrollments: {
            some: { userId },
          },
        },
        include: {
          lessons: {
            where: { isPublished: true },
            orderBy: { order: "asc" },
            include: {
              materials: {
                orderBy: { order: "asc" },
              },
              assignments: {
                where: { isPublished: true },
                include: {
                  submissions: {
                    where: { userId },
                    include: {
                      grade: true,
                    },
                  },
                },
              },
            },
          },
          enrollments: {
            where: { userId },
            include: {
              lessonProgress: {
                where: { lessonId },
              },
            },
          },
        },
      },
    },
  });

  return course;
}

const materialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  VIDEO: Video,
  PDF: FileText,
  LINK: LinkIcon,
  TEXT: BookOpen,
  QUIZ: ClipboardList,
};

export default async function LessonViewerPage({ params }: PageProps) {
  const { slug, lessonId } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const course = await getLessonData(slug, lessonId, session.user.id);

  if (!course || !course.classes[0]) {
    notFound();
  }

  const enrolledClass = course.classes[0];
  const enrollment = enrolledClass.enrollments[0];
  const lessons = enrolledClass.lessons;
  const currentLesson = lessons.find((l) => l.id === lessonId);

  if (!currentLesson) {
    notFound();
  }

  const currentIndex = lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  const isCompleted = enrollment?.lessonProgress.some(
    (lp) => lp.lessonId === lessonId && lp.isCompleted
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/learner/courses/${slug}`}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              Lesson {currentIndex + 1} of {lessons.length}
            </Badge>
            {isCompleted && (
              <Badge className="bg-green-500">
                <CheckCircle className="mr-1 h-3 w-3" />
                Completed
              </Badge>
            )}
          </div>
          <h1 className="mt-1 text-2xl font-bold">{currentLesson.title}</h1>
          <p className="text-sm text-muted-foreground">{course.title}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content">
                <BookOpen className="mr-2 h-4 w-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="assignments">
                <ClipboardList className="mr-2 h-4 w-4" />
                Assignments ({currentLesson.assignments.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="mt-6">
              {/* Lesson Description */}
              {currentLesson.description && (
                <Card>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {currentLesson.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Materials */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Learning Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentLesson.materials.length > 0 ? (
                    <div className="space-y-4">
                      {currentLesson.materials.map((material) => {
                        const Icon =
                          materialIcons[material.type] || FileText;

                        return (
                          <div
                            key={material.id}
                            className="rounded-lg border p-4"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{material.title}</h4>
                                <Badge variant="outline" className="mt-1 text-xs">
                                  {material.type}
                                </Badge>

                                {/* Render content based on type */}
                                <div className="mt-4">
                                  {material.type === "TEXT" && (
                                    <div className="prose prose-sm max-w-none text-muted-foreground">
                                      {material.content}
                                    </div>
                                  )}
                                  {material.type === "VIDEO" && (
                                    <div className="aspect-video rounded-lg bg-muted">
                                      <div className="flex h-full items-center justify-center">
                                        <Video className="h-12 w-12 text-muted-foreground/50" />
                                        <p className="ml-2 text-sm text-muted-foreground">
                                          Video content: {material.content}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                  {material.type === "PDF" && (
                                    <Button variant="outline" size="sm" asChild>
                                      <a
                                        href={material.content}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <FileText className="mr-2 h-4 w-4" />
                                        View PDF
                                      </a>
                                    </Button>
                                  )}
                                  {material.type === "LINK" && (
                                    <Button variant="outline" size="sm" asChild>
                                      <a
                                        href={material.content}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <LinkIcon className="mr-2 h-4 w-4" />
                                        Open Link
                                      </a>
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        No materials available for this lesson yet.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments" className="mt-6">
              {currentLesson.assignments.length > 0 ? (
                <div className="space-y-4">
                  {currentLesson.assignments.map((assignment) => {
                    const submission = assignment.submissions[0];
                    const isSubmitted = !!submission;
                    const isGraded = !!submission?.grade;

                    return (
                      <Card key={assignment.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">
                                {assignment.title}
                              </CardTitle>
                              <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  Due:{" "}
                                  {new Date(
                                    assignment.dueDate
                                  ).toLocaleDateString()}
                                </span>
                                <span>Max Score: {assignment.maxScore}</span>
                              </div>
                            </div>
                            {isGraded && (
                              <Badge className="bg-green-500">
                                Score: {submission.grade?.score}/{assignment.maxScore}
                              </Badge>
                            )}
                            {isSubmitted && !isGraded && (
                              <Badge variant="secondary">Submitted</Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {assignment.description}
                          </p>

                          {/* Submission Form or Status */}
                          {isGraded ? (
                            <div className="mt-4 rounded-lg bg-green-500/10 p-4">
                              <h4 className="font-medium text-green-500">
                                Graded
                              </h4>
                              <p className="mt-1 text-sm">
                                Score: {submission.grade?.score} /{" "}
                                {assignment.maxScore}
                              </p>
                              {submission.grade?.feedback && (
                                <p className="mt-2 text-sm text-muted-foreground">
                                  Feedback: {submission.grade.feedback}
                                </p>
                              )}
                            </div>
                          ) : isSubmitted ? (
                            <div className="mt-4 rounded-lg bg-yellow-500/10 p-4">
                              <h4 className="font-medium text-yellow-500">
                                Submitted - Awaiting Grade
                              </h4>
                              <p className="mt-1 text-sm text-muted-foreground">
                                Your submission is being reviewed by the trainer.
                              </p>
                            </div>
                          ) : (
                            <AssignmentSubmissionForm
                              assignmentId={assignment.id}
                              enrollmentId={enrollment?.id || ""}
                            />
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      No assignments for this lesson.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Complete Lesson */}
          <Card>
            <CardHeader>
              <CardTitle>Lesson Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Duration: {currentLesson.duration} minutes</span>
              </div>

              {isCompleted ? (
                <div className="rounded-lg bg-green-500/10 p-4 text-center">
                  <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
                  <p className="mt-2 font-medium text-green-500">
                    Lesson Completed!
                  </p>
                </div>
              ) : (
                <LessonCompleteButton
                  lessonId={lessonId}
                  enrollmentId={enrollment?.id || ""}
                />
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card>
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {prevLesson && (
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/learner/courses/${slug}/lessons/${prevLesson.id}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous: {prevLesson.title}
                  </Link>
                </Button>
              )}
              {nextLesson && (
                <Button className="w-full justify-start" asChild>
                  <Link href={`/learner/courses/${slug}/lessons/${nextLesson.id}`}>
                    Next: {nextLesson.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              {!nextLesson && (
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/learner/courses/${slug}`}>
                    Back to Course
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
