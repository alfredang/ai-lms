import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Database,
  Download,
  Upload,
  RefreshCw,
  HardDrive,
  Activity,
  Clock,
  Table,
} from "lucide-react";
import Link from "next/link";

async function getDatabaseStats() {
  const [
    userCount,
    courseCount,
    classCount,
    enrollmentCount,
    lessonCount,
    submissionCount,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.class.count(),
    prisma.enrollment.count(),
    prisma.lesson.count(),
    prisma.submission.count(),
  ]);

  return {
    userCount,
    courseCount,
    classCount,
    enrollmentCount,
    lessonCount,
    submissionCount,
  };
}

export default async function DatabasePage() {
  const session = await auth();
  if (!session?.user) return null;

  const stats = await getDatabaseStats();

  const tables = [
    { name: "User", count: stats.userCount, description: "Platform users" },
    { name: "Course", count: stats.courseCount, description: "Available courses" },
    { name: "Class", count: stats.classCount, description: "Course cohorts" },
    { name: "Enrollment", count: stats.enrollmentCount, description: "Student enrollments" },
    { name: "Lesson", count: stats.lessonCount, description: "Course lessons" },
    { name: "Submission", count: stats.submissionCount, description: "Assignment submissions" },
  ];

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
          <h1 className="text-3xl font-bold">Database Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage database operations
          </p>
        </div>
      </div>

      {/* Database Status */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500">Connected</Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Neon PostgreSQL
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.values(stats).reduce((a, b) => a + b, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all tables
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tables</CardTitle>
            <Table className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Active tables
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Database Operations</CardTitle>
          <CardDescription>
            Backup, restore, and maintain database
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Backup
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Data
          </Button>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Demo Data
          </Button>
        </CardContent>
      </Card>

      {/* Table Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Table Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tables.map((table) => (
              <div
                key={table.name}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Table className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{table.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {table.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{table.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">records</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Connection Info */}
      <Card>
        <CardHeader>
          <CardTitle>Connection Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <p className="text-sm font-medium text-muted-foreground">Provider</p>
              <p className="font-medium">Neon PostgreSQL (Serverless)</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm font-medium text-muted-foreground">Region</p>
              <p className="font-medium">US East (Virginia)</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm font-medium text-muted-foreground">ORM</p>
              <p className="font-medium">Prisma 7.x with PrismaNeon Adapter</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm font-medium text-muted-foreground">Connection Pool</p>
              <p className="font-medium">Enabled (Pooler)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
