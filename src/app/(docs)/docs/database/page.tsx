import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DatabasePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Badge variant="outline" className="mb-4">
          Data Layer
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">Database</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          LearnHub uses PostgreSQL with Prisma ORM for type-safe database access
          and Neon for serverless deployment.
        </p>
      </div>

      {/* Schema Overview */}
      <section id="schema">
        <h2 className="text-2xl font-bold">Schema Overview</h2>
        <p className="mt-2 text-muted-foreground">
          The database schema consists of 20+ models organized into logical domains.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { domain: "Authentication", models: ["User", "Account", "Session", "Role"] },
            { domain: "Courses", models: ["Course", "Class", "Lesson", "Material", "Category"] },
            { domain: "Enrollments", models: ["Enrollment", "LessonProgress"] },
            { domain: "Assignments", models: ["Assignment", "Submission", "Grade"] },
            { domain: "Gamification", models: ["GamificationProfile", "Badge", "UserBadge", "XPTransaction"] },
            { domain: "AI", models: ["AIConversation", "AIMessage", "AISettings"] },
          ].map((item) => (
            <Card key={item.domain}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{item.domain}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {item.models.map((model) => (
                    <Badge key={model} variant="secondary">
                      {model}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Prisma */}
      <section id="prisma">
        <h2 className="text-2xl font-bold">Prisma ORM</h2>
        <p className="mt-2 text-muted-foreground">
          Prisma provides type-safe database queries with auto-generated TypeScript types.
        </p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Example Query</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
              <code>{`// Fetch user with enrollments and progress
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    enrollments: {
      include: {
        class: {
          include: { course: true },
        },
        lessonProgress: true,
      },
    },
    gamificationProfile: true,
    earnedBadges: {
      include: { badge: true },
    },
  },
});`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Key Commands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { cmd: "npm run db:push", desc: "Push schema changes to database" },
                { cmd: "npm run db:seed", desc: "Seed database with demo data" },
                { cmd: "npm run db:studio", desc: "Open Prisma Studio GUI" },
                { cmd: "npx prisma generate", desc: "Regenerate Prisma Client" },
              ].map((item) => (
                <div key={item.cmd} className="flex items-center justify-between rounded-lg border p-3">
                  <code className="text-sm">{item.cmd}</code>
                  <span className="text-sm text-muted-foreground">{item.desc}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Neon */}
      <section id="neon">
        <h2 className="text-2xl font-bold">Neon Setup</h2>
        <p className="mt-2 text-muted-foreground">
          Neon provides serverless PostgreSQL with automatic scaling.
        </p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Prisma Configuration for Neon</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
              <code>{`// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();`}</code>
            </pre>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
