import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BookOpen,
  ClipboardCheck,
  MessageSquare,
  ArrowRight,
  Clock,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

async function getTrainerData(trainerId: string) {
  const [classes, pendingSubmissions, totalStudents] = await Promise.all([
    prisma.class.findMany({
      where: { trainerId, isActive: true },
      include: {
        course: true,
        enrollments: {
          where: { status: "ACTIVE" },
        },
      },
    }),
    prisma.submission.findMany({
      where: {
        status: "SUBMITTED",
        assignment: {
          lesson: {
            class: { trainerId },
          },
        },
      },
      include: {
        user: { select: { name: true, email: true } },
        assignment: {
          include: {
            lesson: {
              include: {
                class: {
                  include: { course: true },
                },
              },
            },
          },
        },
      },
      take: 5,
      orderBy: { submittedAt: "desc" },
    }),
    prisma.enrollment.count({
      where: {
        class: { trainerId },
        status: "ACTIVE",
      },
    }),
  ]);

  return {
    classes,
    pendingSubmissions,
    totalStudents,
    activeClasses: classes.length,
  };
}

export default async function TrainerDashboard() {
  const session = await auth();
  if (!session?.user) return null;

  const data = await getTrainerData(session.user.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {session.user.name?.split(" ")[0] || "Trainer"}!
          </h1>
          <p className="text-muted-foreground">
            Manage your classes and grade assignments
          </p>
        </div>
        <Button asChild>
          <Link href="/trainer/grading">
            <ClipboardCheck className="mr-2 h-4 w-4" />
            Go to Grading
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeClasses}</div>
            <p className="text-xs text-muted-foreground">
              Classes you're teaching
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Enrolled learners
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Grading
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.pendingSubmissions.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Submissions to grade
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Discussions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Active discussions
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* My Classes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Classes</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/trainer/classes">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {data.classes.length > 0 ? (
              <div className="space-y-4">
                {data.classes.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <h4 className="font-medium">{classItem.course.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {classItem.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {classItem.enrollments.length} students
                      </Badge>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/trainer/classes/${classItem.id}`}>
                          Manage
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No active classes assigned
              </p>
            )}
          </CardContent>
        </Card>

        {/* Pending Submissions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending Submissions</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/trainer/grading">
                Grade All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {data.pendingSubmissions.length > 0 ? (
              <div className="space-y-4">
                {data.pendingSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">
                        {submission.user.name || submission.user.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {submission.assignment.title}
                      </p>
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/trainer/grading/${submission.id}`}>
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Grade
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle className="mb-4 h-12 w-12 text-green-500/50" />
                <h3 className="font-medium">All caught up!</h3>
                <p className="text-sm text-muted-foreground">
                  No submissions pending review
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
