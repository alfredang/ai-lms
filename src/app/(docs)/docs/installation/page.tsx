import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function InstallationPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Badge variant="outline" className="mb-4">
          Setup
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">Installation</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Complete guide to setting up LearnHub on your local machine.
        </p>
      </div>

      {/* Prerequisites */}
      <section id="prerequisites">
        <h2 className="text-2xl font-bold">Prerequisites</h2>
        <p className="mt-2 text-muted-foreground">
          Make sure you have the following installed on your machine.
        </p>

        <div className="mt-6 space-y-3">
          {[
            { name: "Node.js 18+", desc: "JavaScript runtime", required: true },
            { name: "npm or yarn", desc: "Package manager", required: true },
            { name: "PostgreSQL", desc: "Database (or use Neon)", required: true },
            { name: "Git", desc: "Version control", required: true },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <span className="font-medium">{item.name}</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {item.desc}
                </span>
              </div>
              {item.required && (
                <Badge variant="destructive" className="text-xs">
                  Required
                </Badge>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Local Setup */}
      <section id="local-setup">
        <h2 className="text-2xl font-bold">Local Setup</h2>

        <div className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">1. Clone the Repository</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
                <code>{`git clone https://github.com/alfredang/ai-lms.git
cd ai-lms`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">2. Install Dependencies</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
                <code>npm install</code>
              </pre>
              <p className="mt-3 text-sm text-muted-foreground">
                This installs all required packages including Next.js, Prisma, NextAuth, and UI components.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">3. Configure Environment</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
                <code>cp .env.example .env</code>
              </pre>
              <p className="mt-3 text-sm text-muted-foreground">
                Copy the example environment file and update it with your credentials.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">4. Set Up Database</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
                <code>{`# Push schema to database
npm run db:push

# Seed with demo data
npm run db:seed`}</code>
              </pre>
              <p className="mt-3 text-sm text-muted-foreground">
                This creates all database tables and populates them with sample data.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">5. Start Development Server</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
                <code>npm run dev</code>
              </pre>
              <p className="mt-3 text-sm text-muted-foreground">
                Open{" "}
                <a href="http://localhost:3000" className="text-primary hover:underline">
                  http://localhost:3000
                </a>{" "}
                to view the application.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Environment Variables */}
      <section id="environment">
        <h2 className="text-2xl font-bold">Environment Variables</h2>
        <p className="mt-2 text-muted-foreground">
          Configure these variables in your <code className="rounded bg-muted px-1.5 py-0.5">.env</code> file.
        </p>

        <div className="mt-6 overflow-hidden rounded-lg border">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Variable</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Required</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              <tr>
                <td className="px-4 py-3 font-mono">DATABASE_URL</td>
                <td className="px-4 py-3 text-muted-foreground">PostgreSQL connection string</td>
                <td className="px-4 py-3">
                  <Badge variant="destructive">Yes</Badge>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">AUTH_SECRET</td>
                <td className="px-4 py-3 text-muted-foreground">NextAuth secret (32+ chars)</td>
                <td className="px-4 py-3">
                  <Badge variant="destructive">Yes</Badge>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">AUTH_URL</td>
                <td className="px-4 py-3 text-muted-foreground">App URL (http://localhost:3000)</td>
                <td className="px-4 py-3">
                  <Badge variant="destructive">Yes</Badge>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">AUTH_GOOGLE_ID</td>
                <td className="px-4 py-3 text-muted-foreground">Google OAuth client ID</td>
                <td className="px-4 py-3">
                  <Badge variant="secondary">Optional</Badge>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">AUTH_GOOGLE_SECRET</td>
                <td className="px-4 py-3 text-muted-foreground">Google OAuth secret</td>
                <td className="px-4 py-3">
                  <Badge variant="secondary">Optional</Badge>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">AUTH_GITHUB_ID</td>
                <td className="px-4 py-3 text-muted-foreground">GitHub OAuth client ID</td>
                <td className="px-4 py-3">
                  <Badge variant="secondary">Optional</Badge>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">AUTH_GITHUB_SECRET</td>
                <td className="px-4 py-3 text-muted-foreground">GitHub OAuth secret</td>
                <td className="px-4 py-3">
                  <Badge variant="secondary">Optional</Badge>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">OPENAI_API_KEY</td>
                <td className="px-4 py-3 text-muted-foreground">OpenAI API key for AI features</td>
                <td className="px-4 py-3">
                  <Badge variant="secondary">Optional</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Warning */}
        <div className="mt-6 flex gap-3 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
          <div>
            <h4 className="font-semibold text-yellow-500">Security Note</h4>
            <p className="text-sm text-muted-foreground">
              Never commit your <code className="rounded bg-muted px-1.5 py-0.5">.env</code> file.
              It&apos;s already in <code className="rounded bg-muted px-1.5 py-0.5">.gitignore</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Available Scripts */}
      <section>
        <h2 className="text-2xl font-bold">Available Scripts</h2>

        <div className="mt-6 overflow-hidden rounded-lg border">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Command</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              <tr>
                <td className="px-4 py-3 font-mono">npm run dev</td>
                <td className="px-4 py-3 text-muted-foreground">Start development server</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">npm run build</td>
                <td className="px-4 py-3 text-muted-foreground">Build for production</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">npm run start</td>
                <td className="px-4 py-3 text-muted-foreground">Start production server</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">npm run db:push</td>
                <td className="px-4 py-3 text-muted-foreground">Push schema to database</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">npm run db:seed</td>
                <td className="px-4 py-3 text-muted-foreground">Seed database with demo data</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">npm run db:studio</td>
                <td className="px-4 py-3 text-muted-foreground">Open Prisma Studio GUI</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
