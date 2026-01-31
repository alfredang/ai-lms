import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Users,
  Search,
  UserPlus,
  MoreVertical,
  Shield,
  Mail,
  Trash2,
  Edit,
} from "lucide-react";
import Link from "next/link";

async function getUsers() {
  const users = await prisma.user.findMany({
    include: {
      role: true,
      _count: {
        select: {
          enrollments: true,
          teachingClasses: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return users;
}

export default async function SuperadminUsersPage() {
  const session = await auth();
  if (!session?.user) return null;

  const users = await getUsers();

  const roleColors: Record<string, string> = {
    SUPERADMIN: "bg-purple-500",
    ADMIN: "bg-blue-500",
    TRAINER: "bg-green-500",
    LEARNER: "bg-gray-500",
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
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage all platform users and roles
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">All Roles</Button>
              <Button variant="outline">Export</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            All Users ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 rounded-lg border p-4"
              >
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {user.name?.charAt(0)?.toUpperCase() ||
                      user.email?.charAt(0)?.toUpperCase() ||
                      "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {user.name || "No name"}
                    </p>
                    <Badge className={roleColors[user.role.name] || "bg-gray-500"}>
                      {user.role.name}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
                    {user.role.name === "LEARNER" && (
                      <span>{user._count.enrollments} enrollments</span>
                    )}
                    {user.role.name === "TRAINER" && (
                      <span>{user._count.teachingClasses} classes</span>
                    )}
                    <span>
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Shield className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}

            {users.length === 0 && (
              <div className="py-8 text-center">
                <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">
                  No users found
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
