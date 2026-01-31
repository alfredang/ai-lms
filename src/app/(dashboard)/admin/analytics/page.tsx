import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Clock,
  Target,
} from "lucide-react";
import Link from "next/link";

async function getAnalytics() {
  const [
    totalUsers,
    totalCourses,
    totalEnrollments,
    completedEnrollments,
    totalSubmissions,
    gradedSubmissions,
    recentEnrollments,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.course.count({ where: { isPublished: true } }),
    prisma.enrollment.count(),
    prisma.enrollment.count({ where: { status: "COMPLETED" } }),
    prisma.submission.count(),
    prisma.submission.count({ where: { status: "GRADED" } }),
    prisma.enrollment.findMany({
      take: 7,
      orderBy: { enrolledAt: "desc" },
      include: {
        user: { select: { name: true } },
        class: { include: { course: { select: { title: true } } } },
      },
    }),
  ]);

  const completionRate = totalEnrollments > 0
    ? Math.round((completedEnrollments / totalEnrollments) * 100)
    : 0;

  const gradingRate = totalSubmissions > 0
    ? Math.round((gradedSubmissions / totalSubmissions) * 100)
    : 0;

  // Get enrollments by course
  const courseEnrollments = await prisma.course.findMany({
    where: { isPublished: true },
    include: {
      classes: {
        include: {
          _count: { select: { enrollments: true } },
        },
      },
    },
    orderBy: { title: "asc" },
    take: 10,
  });

  return {
    totalUsers,
    totalCourses,
    totalEnrollments,
    completedEnrollments,
    completionRate,
    totalSubmissions,
    gradedSubmissions,
    gradingRate,
    recentEnrollments,
    courseEnrollments,
  };
}

export default async function AdminAnalyticsPage() {
  const session = await auth();
  if (!session?.user) return null;

  const analytics = await getAnalytics();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Platform performance and insights
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Enrollments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalEnrollments}</div>
            <p className="text-xs text-muted-foreground">
              Active enrollments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.completionRate}%</div>
            <Progress value={analytics.completionRate} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Submissions</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.gradedSubmissions} graded ({analytics.gradingRate}%)
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Course Enrollments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Enrollments by Course
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.courseEnrollments.map((course) => {
                const totalEnrollments = course.classes.reduce(
                  (sum, cls) => sum + cls._count.enrollments,
                  0
                );
                const maxEnrollments = Math.max(
                  ...analytics.courseEnrollments.map((c) =>
                    c.classes.reduce((s, cl) => s + cl._count.enrollments, 0)
                  ),
                  1
                );
                const percentage = (totalEnrollments / maxEnrollments) * 100;

                return (
                  <div key={course.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium truncate max-w-[200px]">
                        {course.title}
                      </span>
                      <span className="text-muted-foreground">
                        {totalEnrollments} enrolled
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}

              {analytics.courseEnrollments.length === 0 && (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  No course data available
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Enrollments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Enrollments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentEnrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <p className="font-medium">
                      {enrollment.user.name || "Anonymous"}
                    </p>
                    <p className="text-muted-foreground">
                      {enrollment.class.course.title}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </span>
                </div>
              ))}

              {analytics.recentEnrollments.length === 0 && (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  No recent enrollments
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border p-4 text-center">
                <div className="text-4xl font-bold text-primary">
                  {analytics.totalCourses}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Published Courses
                </p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <div className="text-4xl font-bold text-green-500">
                  {analytics.completedEnrollments}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Course Completions
                </p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <div className="text-4xl font-bold text-blue-500">
                  {analytics.gradedSubmissions}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Graded Assignments
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
