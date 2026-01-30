import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function DeploymentPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Badge variant="outline" className="mb-4">
          Production
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">Deployment Guide</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Deploy LearnHub to production using Vercel and Neon PostgreSQL for
          a fully serverless, scalable architecture.
        </p>
      </div>

      {/* Vercel Deployment */}
      <section id="vercel">
        <h2 className="text-2xl font-bold">Deploy to Vercel</h2>
        <p className="mt-2 text-muted-foreground">
          Vercel provides the best deployment experience for Next.js applications.
        </p>

        <div className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Step 1: Connect Repository</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Go to <Link href="https://vercel.com" className="text-primary hover:underline">vercel.com</Link> and sign in</li>
                <li>Click &quot;Add New Project&quot;</li>
                <li>Import your GitHub repository</li>
                <li>Select the <code className="rounded bg-muted px-1.5 py-0.5">ai-lms</code> repository</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Step 2: Configure Build Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Vercel auto-detects Next.js. The build command is configured in <code className="rounded bg-muted px-1.5 py-0.5">vercel.json</code>:
              </p>
              <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
                <code>{`{
  "framework": "nextjs",
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install"
}`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Step 3: Add Environment Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Add these environment variables in Vercel Dashboard → Settings → Environment Variables:
              </p>
              <div className="space-y-2">
                {[
                  { name: "DATABASE_URL", required: true },
                  { name: "AUTH_SECRET", required: true },
                  { name: "AUTH_GOOGLE_ID", required: false },
                  { name: "AUTH_GOOGLE_SECRET", required: false },
                  { name: "AUTH_GITHUB_ID", required: false },
                  { name: "AUTH_GITHUB_SECRET", required: false },
                  { name: "OPENAI_API_KEY", required: false },
                ].map((env) => (
                  <div
                    key={env.name}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <code className="text-sm">{env.name}</code>
                    {env.required ? (
                      <Badge variant="destructive">Required</Badge>
                    ) : (
                      <Badge variant="secondary">Optional</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Step 4: Deploy</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
                <code>{`# Via CLI
vercel deploy --prod

# Or push to main branch for auto-deploy`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Neon Setup */}
      <section id="neon">
        <h2 className="text-2xl font-bold">Database Setup (Neon)</h2>
        <p className="mt-2 text-muted-foreground">
          Neon provides serverless PostgreSQL that scales automatically.
        </p>

        <div className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Step 1: Create Neon Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Go to <Link href="https://neon.tech" className="text-primary hover:underline">neon.tech</Link> and sign up</li>
                <li>Click &quot;New Project&quot;</li>
                <li>Enter project name (e.g., <code className="rounded bg-muted px-1.5 py-0.5">ai-lms</code>)</li>
                <li>Select a region close to your Vercel deployment</li>
                <li>Click &quot;Create Project&quot;</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Step 2: Get Connection String</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                After creation, copy your connection string from the dashboard:
              </p>
              <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
                <code>{`postgresql://username:password@ep-xxx-xxx-123456.us-east-2.aws.neon.tech/neondb?sslmode=require`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Step 3: Initialize Database</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Run these commands locally with your Neon DATABASE_URL:
              </p>
              <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
                <code>{`# Set environment variable
export DATABASE_URL="your-neon-connection-string"

# Push schema to Neon
npm run db:push

# Seed with demo data
npm run db:seed`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Environment Variables */}
      <section id="environment">
        <h2 className="text-2xl font-bold">Environment Configuration</h2>
        <p className="mt-2 text-muted-foreground">
          Complete list of environment variables for production deployment.
        </p>

        <Card className="mt-6">
          <CardContent className="pt-6">
            <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
              <code>{`# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://..."

# NextAuth
AUTH_SECRET="random-32-character-secret"
AUTH_URL="https://your-app.vercel.app"

# OAuth (Optional)
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"

# AI Features (Optional)
OPENAI_API_KEY="sk-your-openai-api-key"
OPENAI_BASE_URL="https://api.openai.com/v1"

# File Storage (Optional)
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"

# Email (Optional)
RESEND_API_KEY="re_your-resend-api-key"`}</code>
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* Deployment Checklist */}
      <section>
        <h2 className="text-2xl font-bold">Deployment Checklist</h2>

        <div className="mt-6 space-y-3">
          {[
            "Create Neon database project",
            "Copy Neon connection string",
            "Add DATABASE_URL to Vercel",
            "Generate AUTH_SECRET (32+ chars)",
            "Add AUTH_SECRET to Vercel",
            "Run npm run db:push locally",
            "Run npm run db:seed locally",
            "Deploy to Vercel",
            "Test login with demo accounts",
            "(Optional) Configure OAuth providers",
            "(Optional) Add OpenAI API key",
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Links */}
      <section>
        <h2 className="text-2xl font-bold">Useful Links</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { name: "Vercel Dashboard", url: "https://vercel.com/dashboard" },
            { name: "Neon Console", url: "https://console.neon.tech" },
            { name: "GitHub Repository", url: "https://github.com/alfredang/ai-lms" },
            { name: "Demo Site", url: "https://ai-lms-xi.vercel.app" },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <span className="font-medium">{link.name}</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
