import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Trophy, Bot } from "lucide-react";

export default function GettingStartedPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Badge variant="outline" className="mb-4">
          Documentation
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">Getting Started</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Welcome to LearnHub, an AI-powered Learning Management System built with
          modern technologies for scalable, engaging online education.
        </p>
      </div>

      {/* Key Features */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Modern Stack</h3>
              <p className="text-sm text-muted-foreground">
                Built with Next.js 14, TypeScript, Tailwind CSS, and Prisma ORM
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Role-Based Access</h3>
              <p className="text-sm text-muted-foreground">
                Learner, Trainer, Admin, and Superadmin roles with granular permissions
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Gamification</h3>
              <p className="text-sm text-muted-foreground">
                XP points, badges, levels, and learning streaks to engage learners
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Context-aware chatbot for personalized learning assistance
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start */}
      <section id="quick-start">
        <h2 className="text-2xl font-bold">Quick Start</h2>
        <p className="mt-2 text-muted-foreground">
          Get LearnHub running locally in just a few steps.
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-mono text-sm font-semibold text-primary">
              Step 1: Clone the repository
            </h3>
            <pre className="mt-2 rounded-md bg-muted p-3 text-sm">
              <code>git clone https://github.com/alfredang/ai-lms.git{"\n"}cd ai-lms</code>
            </pre>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-mono text-sm font-semibold text-primary">
              Step 2: Install dependencies
            </h3>
            <pre className="mt-2 rounded-md bg-muted p-3 text-sm">
              <code>npm install</code>
            </pre>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-mono text-sm font-semibold text-primary">
              Step 3: Set up environment
            </h3>
            <pre className="mt-2 rounded-md bg-muted p-3 text-sm">
              <code>cp .env.example .env{"\n"}# Edit .env with your credentials</code>
            </pre>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-mono text-sm font-semibold text-primary">
              Step 4: Set up database
            </h3>
            <pre className="mt-2 rounded-md bg-muted p-3 text-sm">
              <code>npm run db:push{"\n"}npm run db:seed</code>
            </pre>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-mono text-sm font-semibold text-primary">
              Step 5: Start development server
            </h3>
            <pre className="mt-2 rounded-md bg-muted p-3 text-sm">
              <code>npm run dev</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Demo Accounts */}
      <section id="demo-accounts">
        <h2 className="text-2xl font-bold">Demo Accounts</h2>
        <p className="mt-2 text-muted-foreground">
          After seeding the database, you can log in with these accounts to explore different roles.
        </p>

        <div className="mt-6 overflow-hidden rounded-lg border">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Password</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-3">
                  <Badge>Superadmin</Badge>
                </td>
                <td className="px-4 py-3 font-mono text-sm">admin@learnhub.com</td>
                <td className="px-4 py-3 font-mono text-sm">admin123</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <Badge variant="secondary">Trainer</Badge>
                </td>
                <td className="px-4 py-3 font-mono text-sm">trainer@learnhub.com</td>
                <td className="px-4 py-3 font-mono text-sm">admin123</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <Badge variant="outline">Learner</Badge>
                </td>
                <td className="px-4 py-3 font-mono text-sm">learner@learnhub.com</td>
                <td className="px-4 py-3 font-mono text-sm">admin123</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 className="text-2xl font-bold">Tech Stack</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Next.js 14", desc: "React framework with App Router" },
            { name: "TypeScript", desc: "Type-safe development" },
            { name: "Tailwind CSS", desc: "Utility-first styling" },
            { name: "Prisma ORM", desc: "Type-safe database access" },
            { name: "PostgreSQL", desc: "Reliable relational database" },
            { name: "NextAuth v5", desc: "Secure authentication" },
            { name: "OpenAI API", desc: "AI-powered features" },
            { name: "Vercel", desc: "Edge deployment" },
            { name: "Neon", desc: "Serverless PostgreSQL" },
          ].map((tech) => (
            <div key={tech.name} className="rounded-lg border bg-card p-4">
              <h3 className="font-semibold">{tech.name}</h3>
              <p className="text-sm text-muted-foreground">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-bold">Next Steps</h2>
        <div className="mt-4 grid gap-3">
          <Link
            href="/docs/installation"
            className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
          >
            <span className="font-medium">Detailed Installation Guide</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/docs/authentication"
            className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
          >
            <span className="font-medium">Configure Authentication</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/docs/deployment"
            className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
          >
            <span className="font-medium">Deploy to Production</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
