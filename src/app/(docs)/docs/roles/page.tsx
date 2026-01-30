import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

export default function RolesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Badge variant="outline" className="mb-4">
          Authorization
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">Roles & Permissions</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          LearnHub uses a hierarchical role-based access control (RBAC) system
          to manage user permissions across the platform.
        </p>
      </div>

      {/* Role Hierarchy */}
      <section id="hierarchy">
        <h2 className="text-2xl font-bold">Role Hierarchy</h2>
        <p className="mt-2 text-muted-foreground">
          Higher roles inherit all permissions from lower roles.
        </p>

        <div className="mt-6 space-y-4">
          <Card className="border-primary">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Badge>SUPERADMIN</Badge>
                <span className="text-sm font-normal text-muted-foreground">
                  Level 4 - Full System Access
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Complete system control including API keys, system settings, and all administrative functions.
                Can manage all users regardless of role.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">ADMIN</Badge>
                <span className="text-sm font-normal text-muted-foreground">
                  Level 3 - Platform Administration
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage courses, users (except superadmins), enrollments, and view analytics.
                Cannot access system-level settings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Badge variant="outline">TRAINER</Badge>
                <span className="text-sm font-normal text-muted-foreground">
                  Level 2 - Course Instruction
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage assigned classes, create materials, grade assignments, and interact with enrolled students.
                Limited to their own classes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Badge variant="outline">LEARNER</Badge>
                <span className="text-sm font-normal text-muted-foreground">
                  Level 1 - Learning Access
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Enroll in courses, access materials, submit assignments, participate in discussions,
                and track personal progress.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Permissions Matrix */}
      <section id="permissions">
        <h2 className="text-2xl font-bold">Permissions Matrix</h2>
        <p className="mt-2 text-muted-foreground">
          Detailed breakdown of permissions for each role.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-muted">
                <th className="p-3 text-left text-sm font-semibold">Action</th>
                <th className="p-3 text-center text-sm font-semibold">Learner</th>
                <th className="p-3 text-center text-sm font-semibold">Trainer</th>
                <th className="p-3 text-center text-sm font-semibold">Admin</th>
                <th className="p-3 text-center text-sm font-semibold">Superadmin</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                { action: "Enroll in courses", learner: true, trainer: true, admin: true, superadmin: true },
                { action: "View course materials", learner: true, trainer: true, admin: true, superadmin: true },
                { action: "Submit assignments", learner: true, trainer: false, admin: false, superadmin: false },
                { action: "View own progress", learner: true, trainer: true, admin: true, superadmin: true },
                { action: "Grade assignments", learner: false, trainer: true, admin: true, superadmin: true },
                { action: "Create course materials", learner: false, trainer: true, admin: true, superadmin: true },
                { action: "Manage class students", learner: false, trainer: true, admin: true, superadmin: true },
                { action: "Create courses", learner: false, trainer: false, admin: true, superadmin: true },
                { action: "Manage all users", learner: false, trainer: false, admin: true, superadmin: true },
                { action: "View platform analytics", learner: false, trainer: false, admin: true, superadmin: true },
                { action: "Configure AI settings", learner: false, trainer: false, admin: false, superadmin: true },
                { action: "Manage API keys", learner: false, trainer: false, admin: false, superadmin: true },
                { action: "System settings", learner: false, trainer: false, admin: false, superadmin: true },
              ].map((row) => (
                <tr key={row.action}>
                  <td className="p-3 text-sm">{row.action}</td>
                  <td className="p-3 text-center">
                    {row.learner ? (
                      <CheckCircle className="mx-auto h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="mx-auto h-5 w-5 text-muted-foreground/30" />
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {row.trainer ? (
                      <CheckCircle className="mx-auto h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="mx-auto h-5 w-5 text-muted-foreground/30" />
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {row.admin ? (
                      <CheckCircle className="mx-auto h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="mx-auto h-5 w-5 text-muted-foreground/30" />
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {row.superadmin ? (
                      <CheckCircle className="mx-auto h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="mx-auto h-5 w-5 text-muted-foreground/30" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Middleware */}
      <section id="middleware">
        <h2 className="text-2xl font-bold">Middleware Protection</h2>
        <p className="mt-2 text-muted-foreground">
          Routes are protected using Next.js middleware based on user roles.
        </p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Route Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
              <code>{`// src/middleware.ts
const roleRoutes = {
  '/learner': ['LEARNER', 'TRAINER', 'ADMIN', 'SUPERADMIN'],
  '/trainer': ['TRAINER', 'ADMIN', 'SUPERADMIN'],
  '/admin': ['ADMIN', 'SUPERADMIN'],
  '/superadmin': ['SUPERADMIN'],
};`}</code>
            </pre>
            <p className="mt-4 text-sm text-muted-foreground">
              Each route prefix requires at least one of the listed roles. Users without
              sufficient permissions are redirected to their appropriate dashboard.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Public Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
              <code>{`const publicRoutes = [
  '/',        // Landing page
  '/login',   // Login page
  '/register',// Registration page
  '/courses', // Course catalog
  '/about',   // About page
  '/contact', // Contact page
];`}</code>
            </pre>
            <p className="mt-4 text-sm text-muted-foreground">
              These routes are accessible without authentication.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Default Role */}
      <section>
        <h2 className="text-2xl font-bold">Default Role Assignment</h2>
        <p className="mt-2 text-muted-foreground">
          New users are automatically assigned the LEARNER role upon registration.
        </p>

        <Card className="mt-6">
          <CardContent className="pt-6">
            <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
              <code>{`// On registration, assign LEARNER role
const learnerRole = await prisma.role.findUnique({
  where: { name: 'LEARNER' },
});

await prisma.user.create({
  data: {
    email,
    name,
    password: hashedPassword,
    roleId: learnerRole.id,
  },
});`}</code>
            </pre>
            <p className="mt-4 text-sm text-muted-foreground">
              Admins can upgrade user roles through the admin dashboard.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
