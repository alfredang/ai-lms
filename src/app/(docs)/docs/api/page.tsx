import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function APIPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Badge variant="outline" className="mb-4">
          Reference
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">API Reference</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          LearnHub exposes REST API endpoints for authentication, courses, enrollments, and more.
        </p>
      </div>

      {/* Authentication */}
      <section id="auth">
        <h2 className="text-2xl font-bold">Authentication</h2>
        <p className="mt-2 text-muted-foreground">
          Authentication is handled by NextAuth with JWT sessions.
        </p>

        <div className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-green-500">POST</Badge>
                <code className="text-sm">/api/auth/register</code>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Register a new user account.</p>
              <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
                <code>{`// Request
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

// Response
{
  "message": "User created successfully"
}`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-green-500">POST</Badge>
                <code className="text-sm">/api/auth/callback/credentials</code>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Sign in with email and password.</p>
              <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
                <code>{`// Request
{
  "email": "john@example.com",
  "password": "securepassword123"
}

// Response: JWT token set in cookies`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-blue-500">GET</Badge>
                <code className="text-sm">/api/auth/session</code>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Get current session information.</p>
              <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
                <code>{`// Response
{
  "user": {
    "id": "clx...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "LEARNER"
  },
  "expires": "2026-02-28T00:00:00.000Z"
}`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Courses */}
      <section id="courses">
        <h2 className="text-2xl font-bold">Courses</h2>
        <p className="mt-2 text-muted-foreground">
          Endpoints for course management and retrieval.
        </p>

        <div className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-blue-500">GET</Badge>
                <code className="text-sm">/api/courses</code>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">List all published courses.</p>
              <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
                <code>{`// Response
{
  "courses": [
    {
      "id": "clx...",
      "title": "Next.js Fundamentals",
      "slug": "nextjs-fundamentals",
      "description": "...",
      "duration": 480,
      "difficulty": "BEGINNER",
      "category": { "name": "Web Development" }
    }
  ]
}`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-blue-500">GET</Badge>
                <code className="text-sm">/api/courses/[slug]</code>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Get course details by slug.</p>
              <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
                <code>{`// Response
{
  "course": {
    "id": "clx...",
    "title": "Next.js Fundamentals",
    "classes": [
      {
        "id": "...",
        "name": "January 2026 Cohort",
        "lessons": [...]
      }
    ]
  }
}`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-green-500">POST</Badge>
                <code className="text-sm">/api/courses</code>
                <Badge variant="outline">Admin+</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Create a new course (Admin or Superadmin only).</p>
              <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
                <code>{`// Request
{
  "title": "React Advanced Patterns",
  "description": "...",
  "categoryId": "clx...",
  "duration": 600,
  "difficulty": "ADVANCED"
}`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Enrollments */}
      <section id="enrollments">
        <h2 className="text-2xl font-bold">Enrollments</h2>
        <p className="mt-2 text-muted-foreground">
          Endpoints for managing course enrollments.
        </p>

        <div className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-green-500">POST</Badge>
                <code className="text-sm">/api/enrollments</code>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Enroll in a class.</p>
              <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
                <code>{`// Request
{
  "classId": "clx..."
}

// Response
{
  "enrollment": {
    "id": "clx...",
    "status": "ACTIVE",
    "enrolledAt": "2026-01-31T00:00:00.000Z"
  }
}`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-blue-500">GET</Badge>
                <code className="text-sm">/api/enrollments</code>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Get current user&apos;s enrollments.</p>
              <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
                <code>{`// Response
{
  "enrollments": [
    {
      "id": "clx...",
      "status": "ACTIVE",
      "class": {
        "course": { "title": "Next.js Fundamentals" }
      },
      "progress": 33.3
    }
  ]
}`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Error Responses */}
      <section>
        <h2 className="text-2xl font-bold">Error Responses</h2>
        <p className="mt-2 text-muted-foreground">
          Standard error response format for all API endpoints.
        </p>

        <Card className="mt-6">
          <CardContent className="pt-6">
            <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
              <code>{`// 400 Bad Request
{ "message": "Validation failed", "errors": [...] }

// 401 Unauthorized
{ "message": "Authentication required" }

// 403 Forbidden
{ "message": "Insufficient permissions" }

// 404 Not Found
{ "message": "Resource not found" }

// 500 Internal Server Error
{ "message": "Something went wrong" }`}</code>
            </pre>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
