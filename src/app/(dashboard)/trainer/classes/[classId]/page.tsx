import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DaysRemaining } from "@/components/dashboard/days-remaining";
import Link from "next/link";
import {
  Users,
  BookOpen,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  ArrowLeft,
  Mail,
  Calendar,
} from "lucide-react";

interface PageProps {
  params: Promise<{ classId: string }>;
}

async function getClassData(classId: string, trainerId: string) {
  const classData = await prisma.class.findUnique({
    where: {
      id: classId,
      trainerId: trainerId,
    },
    include: {
      course: true,
      lessons: {
        orderBy: { order: "asc" },
      },
      enrollments: {
        where: { status: "ACTIVE" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          lessonProgress: {
            include: {
              lesson: true,
            },
          },
        },
      },
    },
  });

  return classData;
}

function calculateExpectedProgress(startDate: Date, endDate: Date): number {
  const now = new Date();
  const total = endDate.getTime() - startDate.getTime();
  const elapsed = now.getTime() - startDate.getTime();
  const progress = Math.min(100, Math.max(0, (elapsed / total) * 100));
  return Math.round(progress);
}

function getProgressStatus(
  actualProgress: number,
  expectedProgress: number
): "on-track" | "slightly-behind" | "lagging" {
  const difference = expectedProgress - actualProgress;
  if (difference <= 10) return "on-track";
  if (difference <= 25) return "slightly-behind";
  return "lagging";
}

export default async function TrainerClassPage({ params }: PageProps) {
  const { classId } = await params;
  const session = await auth();

  if (!session?.user) return null;

  const classData = await getClassData(classId, session.user.id);

  if (!classData) {
    notFound();
  }

  const totalLessons = classData.lessons.length;
  const expectedProgress = calculateExpectedProgress(
    classData.startDate,
    classData.endDate
  );

  // Calculate student progress and identify lagging students
  const studentsWithProgress = classData.enrollments.map((enrollment) => {
    const completedLessons = enrollment.lessonProgress.filter(
      (lp) => lp.isCompleted
    ).length;
    const actualProgress =
      totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const status = getProgressStatus(actualProgress, expectedProgress);

    return {
      ...enrollment,
      completedLessons,
      actualProgress,
      status,
      lastActivity: enrollment.lessonProgress.reduce((latest, lp) => {
        if (lp.completedAt && (!latest || lp.completedAt > latest)) {
          return lp.completedAt;
        }
        return latest;
      }, null as Date | null),
    };
  });

  const laggingStudents = studentsWithProgress.filter(
    (s) => s.status === "lagging"
  );
  const slightlyBehindStudents = studentsWithProgress.filter(
    (s) => s.status === "slightly-behind"
  );
  const onTrackStudents = studentsWithProgress.filter(
    (s) => s.status === "on-track"
  );

  const averageProgress =
    studentsWithProgress.length > 0
      ? Math.round(
          studentsWithProgress.reduce((sum, s) => sum + s.actualProgress, 0) /
            studentsWithProgress.length
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/trainer/classes">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{classData.course.title}</h1>
          <p className="text-muted-foreground">{classData.name}</p>
        </div>
      </div>

      {/* Alert for Lagging Students */}
      {laggingStudents.length > 0 && (
        <Card className="border-red-500/50 bg-red-500/10">
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/20">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-500">
                {laggingStudents.length} Student
                {laggingStudents.length !== 1 ? "s" : ""} Lagging Behind
              </h3>
              <p className="text-sm text-muted-foreground">
                The following students are more than 25% behind the expected schedule
                and may need additional support:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {laggingStudents.map((student) => (
                  <Badge
                    key={student.user.id}
                    variant="outline"
                    className="border-red-500/50"
                  >
                    {student.user.name || student.user.email}
                  </Badge>
                ))}
              </div>
              <Button size="sm" className="mt-4" variant="destructive">
                <Mail className="mr-2 h-4 w-4" />
                Send Reminder to All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {classData.enrollments.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Active enrollments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Course Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageProgress}%</div>
            <div className="mt-2">
              <Progress value={averageProgress} className="h-2" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Class average (Expected: {expectedProgress}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLessons}</div>
            <p className="text-xs text-muted-foreground">In this course</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Time Remaining</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <DaysRemaining endDate={classData.endDate} />
            <p className="text-xs text-muted-foreground">Days until end</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-green-500/30">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-500">
                {onTrackStudents.length}
              </p>
              <p className="text-sm text-muted-foreground">On Track</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-500">
                {slightlyBehindStudents.length}
              </p>
              <p className="text-sm text-muted-foreground">Slightly Behind</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500/30">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-500">
                {laggingStudents.length}
              </p>
              <p className="text-sm text-muted-foreground">Lagging Behind</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Progress List */}
      <Card>
        <CardHeader>
          <CardTitle>Student Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentsWithProgress
              .sort((a, b) => a.actualProgress - b.actualProgress)
              .map((student) => (
                <div
                  key={student.id}
                  className="flex items-center gap-4 rounded-lg border p-4"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {student.user.name?.charAt(0)?.toUpperCase() ||
                        student.user.email?.charAt(0)?.toUpperCase() ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {student.user.name || student.user.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {student.completedLessons} of {totalLessons} lessons
                          completed
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {student.status === "lagging" && (
                          <Badge variant="destructive">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            Lagging
                          </Badge>
                        )}
                        {student.status === "slightly-behind" && (
                          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                            <Clock className="mr-1 h-3 w-3" />
                            Behind
                          </Badge>
                        )}
                        {student.status === "on-track" && (
                          <Badge variant="outline" className="border-green-500 text-green-500">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            On Track
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Progress
                        value={student.actualProgress}
                        className={`h-2 flex-1 ${
                          student.status === "lagging"
                            ? "[&>div]:bg-red-500"
                            : student.status === "slightly-behind"
                            ? "[&>div]:bg-yellow-500"
                            : "[&>div]:bg-green-500"
                        }`}
                      />
                      <span className="text-sm font-medium w-12 text-right">
                        {student.actualProgress}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        Expected: {expectedProgress}%
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Last active:{" "}
                        {student.lastActivity
                          ? new Date(student.lastActivity).toLocaleDateString()
                          : "Never"}
                      </span>
                    </div>
                  </div>

                  <Button size="sm" variant="outline">
                    <Mail className="mr-1 h-4 w-4" />
                    Contact
                  </Button>
                </div>
              ))}
          </div>

          {studentsWithProgress.length === 0 && (
            <div className="py-8 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 font-medium">No students enrolled</h3>
              <p className="text-sm text-muted-foreground">
                Students will appear here once they enroll in this class.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
