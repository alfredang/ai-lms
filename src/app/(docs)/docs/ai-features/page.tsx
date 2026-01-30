import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, MessageSquare, Sparkles, Zap } from "lucide-react";

export default function AIFeaturesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Badge variant="outline" className="mb-4">
          Intelligence
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">AI Features</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          LearnHub integrates OpenAI for intelligent learning assistance,
          providing context-aware help based on the user&apos;s current course and progress.
        </p>
      </div>

      {/* Chat Assistant */}
      <section id="chat">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          AI Chat Assistant
        </h2>
        <p className="mt-2 text-muted-foreground">
          Context-aware chatbot that helps learners understand course material.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Learner Assistant</h3>
                <p className="text-sm text-muted-foreground">
                  Explains concepts, answers questions, suggests learning paths
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Trainer Assistant</h3>
                <p className="text-sm text-muted-foreground">
                  Generates quizzes, creates rubrics, suggests feedback
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Chat Widget Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
              <code>{`// src/components/ai/chat-widget.tsx
<ChatWidget
  userId={session.user.id}
  context={{
    courseId: currentCourse?.id,
    lessonId: currentLesson?.id,
    role: session.user.role,
  }}
/>`}</code>
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* Context Injection */}
      <section id="context">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          Context Injection
        </h2>
        <p className="mt-2 text-muted-foreground">
          The AI system prompt is enhanced with relevant context about the user&apos;s current learning state.
        </p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Context Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
              <code>{`// Context injected into AI prompts
{
  user: {
    name: "John Doe",
    role: "LEARNER",
    level: 5,
    totalXp: 7500,
  },
  course: {
    title: "Next.js Fundamentals",
    description: "...",
    currentLesson: "File-based Routing",
  },
  progress: {
    completedLessons: 15,
    totalLessons: 30,
    percentComplete: 50,
  },
  recentActivity: [
    "Completed: Introduction to Next.js",
    "Submitted: Project Setup Quiz",
  ],
}`}</code>
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* Configuration */}
      <section id="config">
        <h2 className="text-2xl font-bold">Configuration</h2>
        <p className="mt-2 text-muted-foreground">
          Configure OpenAI settings for optimal performance.
        </p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">AI Service Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
              <code>{`// src/services/ai.service.ts
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "system", content: systemPrompt },
    ...conversationHistory,
    { role: "user", content: userMessage },
  ],
  temperature: 0.7,
  max_tokens: 1024,
  stream: true,
});`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Rate Limiting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { role: "Learner", limit: "50 messages/day" },
                { role: "Trainer", limit: "100 messages/day" },
                { role: "Admin", limit: "200 messages/day" },
                { role: "Superadmin", limit: "Unlimited" },
              ].map((item) => (
                <div key={item.role} className="flex items-center justify-between rounded-lg border p-3">
                  <span className="font-medium">{item.role}</span>
                  <Badge variant="secondary">{item.limit}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
