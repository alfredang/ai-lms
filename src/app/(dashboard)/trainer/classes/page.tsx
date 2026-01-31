import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Users,
  BookOpen,
  Calendar,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Clock,
} from "lucide-react";

async function getTrainerClasses(trainerId: string) {
  const classes = await prisma.class.findMany({
    where: { trainerId },
    include: {
      course: true,
      lessons: {
        select: { id: true },
      },
      enrollments: {
        where: { status: "ACTIVE" },
        include: {
          lessonProgress: {
            where: { isCompleted: true },
          },
        },
      },
    },
    orderBy: { startDate: "desc" },
  });

  return classes;
}

function calculateExpectedProgress(startDate: Date, endDate: Date): number {
  const now = new Date();
  const total = endDate.getTime() - startDate.getTime();
  const elapsed = now.getTime() - startDate.getTime();
  const progress = Math.min(100, Math.max(0, (elapsed / total) * 100));
  return Math.round(progress);
}

export default async function TrainerClassesPage() {
  const session = await auth();
  if (!session?.user) return null;

  const classes = await getTrainerClasses(session.user.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Classes</h1>
        <p className="text-muted-foreground">
          Manage your classes and track student progress
        </p>
      </div>

      {/* Classes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem) => {
          const totalLessons = classItem.lessons.length;
          const studentCount = classItem.enrollments.length;
          const expectedProgress = calculateExpectedProgress(
            classItem.startDate,
            classItem.endDate
          );

          // Calculate class average progress
          const avgProgress =
            studentCount > 0
              ? Math.round(
                  classItem.enrollments.reduce((sum, enrollment) => {
                    const completed = enrollment.lessonProgress.length;
                    return sum + (totalLessons > 0 ? (completed / totalLessons) * 100 : 0);
                  }, 0) / studentCount
                )
              : 0;

          // Count lagging students
          const laggingCount = classItem.enrollments.filter((enrollment) => {
            const completed = enrollment.lessonProgress.length;
            const progress = totalLessons > 0 ? (completed / totalLessons) * 100 : 0;
            return expectedProgress - progress > 25;
          }).length;

          const isActive = classItem.isActive && new Date() < classItem.endDate;

          return (
            <Card key={classItem.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <Badge variant={isActive ? "default" : "secondary"}>
                    {isActive ? "Active" : "Completed"}
                  </Badge>
                  {laggingCount > 0 && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {laggingCount} behind
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-2 text-lg">
                  {classItem.course.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{classItem.name}</p>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{studentCount} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{totalLessons} lessons</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Class Progress</span>
                    <span className="font-medium">{avgProgress}%</span>
                  </div>
                  <Progress
                    value={avgProgress}
                    className={`h-2 ${
                      avgProgress >= expectedProgress
                        ? "[&>div]:bg-green-500"
                        : avgProgress >= expectedProgress - 25
                        ? "[&>div]:bg-yellow-500"
                        : "[&>div]:bg-red-500"
                    }`}
                  />
                  <p className="text-xs text-muted-foreground">
                    Expected: {expectedProgress}%
                  </p>
                </div>

                {/* Status indicators */}
                <div className="flex items-center gap-2 text-xs">
                  {avgProgress >= expectedProgress ? (
                    <span className="flex items-center gap-1 text-green-500">
                      <CheckCircle className="h-3 w-3" />
                      On schedule
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-500">
                      <Clock className="h-3 w-3" />
                      Behind schedule
                    </span>
                  )}
                </div>

                {/* Dates */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(classItem.startDate).toLocaleDateString()} -{" "}
                  {new Date(classItem.endDate).toLocaleDateString()}
                </div>
              </CardContent>

              <div className="border-t p-4">
                <Button className="w-full" asChild>
                  <Link href={`/trainer/classes/${classItem.id}`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {classes.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No classes assigned</h3>
            <p className="text-sm text-muted-foreground">
              You don&apos;t have any classes assigned yet. Contact an administrator
              to get started.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
