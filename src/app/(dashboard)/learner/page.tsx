import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { XPBar } from "@/components/gamification/xp-bar";
import { StreakCounter } from "@/components/gamification/streak-counter";
import {
  BookOpen,
  Clock,
  Trophy,
  Target,
  ArrowRight,
  Play,
  Calendar,
  Zap,
} from "lucide-react";
import Link from "next/link";

async function getDashboardData(userId: string) {
  const [profile, enrollments, recentActivity] = await Promise.all([
    prisma.gamificationProfile.findUnique({
      where: { userId },
      include: {
        xpHistory: {
          take: 5,
          orderBy: { createdAt: "desc" },
        },
      },
    }),
    prisma.enrollment.findMany({
      where: {
        userId,
        status: "ACTIVE",
      },
      include: {
        class: {
          include: {
            course: true,
            lessons: {
              select: { id: true },
            },
          },
        },
        lessonProgress: {
          where: { isCompleted: true },
        },
      },
      take: 4,
    }),
    prisma.xPTransaction.findMany({
      where: {
        profile: { userId },
      },
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // Get upcoming deadlines
  const upcomingDeadlines = await prisma.assignment.findMany({
    where: {
      lesson: {
        class: {
          enrollments: {
            some: { userId },
          },
        },
      },
      dueDate: {
        gte: new Date(),
      },
      isPublished: true,
    },
    orderBy: { dueDate: "asc" },
    take: 5,
    include: {
      lesson: {
        include: {
          class: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });

  // Get earned badges count
  const badgeCount = await prisma.userBadge.count({
    where: { userId },
  });

  return {
    profile,
    enrollments,
    recentActivity,
    upcomingDeadlines,
    badgeCount,
  };
}

export default async function LearnerDashboard() {
  const session = await auth();
  if (!session?.user) return null;

  const data = await getDashboardData(session.user.id);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {session.user.name?.split(" ")[0] || "Learner"}!
          </h1>
          <p className="text-muted-foreground">
            Continue your learning journey today
          </p>
        </div>
        <Button asChild>
          <Link href="/courses">
            Browse Courses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Courses Enrolled
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.enrollments.length}</div>
            <p className="text-xs text-muted-foreground">
              Active enrollments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total XP</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.profile?.totalXp?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Level {data.profile?.level || 1}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.badgeCount}</div>
            <p className="text-xs text-muted-foreground">
              Achievements unlocked
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.profile?.currentStreak || 0} days
            </div>
            <p className="text-xs text-muted-foreground">
              Best: {data.profile?.longestStreak || 0} days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content - 2 columns */}
        <div className="space-y-6 lg:col-span-2">
          {/* XP Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <XPBar
                totalXp={data.profile?.totalXp || 0}
                level={data.profile?.level || 1}
              />
            </CardContent>
          </Card>

          {/* Continue Learning */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Continue Learning</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/learner/courses">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {data.enrollments.length > 0 ? (
                <div className="space-y-4">
                  {data.enrollments.map((enrollment) => {
                    const totalLessons = enrollment.class.lessons.length;
                    const completedLessons = enrollment.lessonProgress.length;
                    const progressPercent =
                      totalLessons > 0
                        ? (completedLessons / totalLessons) * 100
                        : 0;

                    return (
                      <div
                        key={enrollment.id}
                        className="flex items-center gap-4 rounded-lg border p-4"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <Play className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="font-medium">
                            {enrollment.class.course.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {enrollment.class.name}
                          </p>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={progressPercent}
                              className="h-2 flex-1"
                            />
                            <span className="text-xs text-muted-foreground">
                              {Math.round(progressPercent)}%
                            </span>
                          </div>
                        </div>
                        <Button size="sm" asChild>
                          <Link
                            href={`/learner/courses/${enrollment.class.course.slug}`}
                          >
                            Continue
                          </Link>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <BookOpen className="mb-4 h-12 w-12 text-muted-foreground/50" />
                  <h3 className="font-medium">No courses yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore our catalog and enroll in your first course
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/courses">Browse Courses</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Deadlines</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/learner/calendar">
                  View Calendar
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {data.upcomingDeadlines.length > 0 ? (
                <div className="space-y-3">
                  {data.upcomingDeadlines.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                          <Clock className="h-5 w-5 text-orange-500" />
                        </div>
                        <div>
                          <p className="font-medium">{assignment.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {assignment.lesson.class.course.title}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  No upcoming deadlines
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Streak Card */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Streak</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center py-4">
              <StreakCounter
                currentStreak={data.profile?.currentStreak || 0}
                longestStreak={data.profile?.longestStreak || 0}
                size="lg"
              />
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {data.recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {data.recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">
                          {activity.reason}
                        </span>
                      </div>
                      <Badge variant="secondary">+{activity.amount} XP</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  No recent activity
                </p>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/learner/courses">
                  <BookOpen className="mr-2 h-4 w-4" />
                  My Courses
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/learner/achievements">
                  <Trophy className="mr-2 h-4 w-4" />
                  Achievements
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/learner/calendar">
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendar
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
