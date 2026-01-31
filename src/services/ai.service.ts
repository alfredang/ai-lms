import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import type { RoleName } from "@prisma/client";
import type { ChatContext, ChatMessage } from "@/types";

// System prompts for different roles
const SYSTEM_PROMPTS: Record<RoleName, string> = {
  LEARNER: `You are an AI learning assistant for LearnHub, an educational platform. Your role is to help learners understand course material, answer questions, and provide study guidance.

Guidelines:
- Be encouraging and supportive
- Explain concepts clearly and simply
- Use examples when helpful
- If you don't know something, say so
- Don't give direct answers to assignments - guide learners to find answers themselves
- Reference the current course/lesson context when relevant`,

  TRAINER: `You are an AI teaching assistant for LearnHub. Your role is to help trainers create effective learning materials, assessments, and provide teaching support.

Guidelines:
- Help create quiz questions and assessments
- Suggest grading rubrics
- Provide feedback templates
- Help identify common student misconceptions
- Suggest ways to explain difficult concepts
- Assist with lesson planning`,

  ADMIN: `You are an AI administrative assistant for LearnHub. Your role is to help administrators manage the platform effectively.

Guidelines:
- Provide analytics insights
- Help with course organization
- Assist with user management queries
- Suggest improvements based on platform data
- Help draft communications`,

  SUPERADMIN: `You are an AI system assistant for LearnHub with full access. Your role is to help superadmins with technical and administrative tasks.

Guidelines:
- Assist with system configuration
- Help troubleshoot issues
- Provide technical guidance
- Assist with platform optimization`,
};

export class AIService {
  private _openai: OpenAI | null = null;

  private get openai(): OpenAI {
    if (!this._openai) {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error("OPENAI_API_KEY environment variable is not set");
      }
      this._openai = new OpenAI({
        apiKey,
        baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
      });
    }
    return this._openai;
  }

  /**
   * Create or get conversation
   */
  async getOrCreateConversation(
    userId: string,
    context?: ChatContext
  ): Promise<string> {
    // Check for existing active conversation with same context
    const existing = await prisma.aIConversation.findFirst({
      where: {
        userId,
        ...(context?.courseId && {
          context: {
            path: ["courseId"],
            equals: context.courseId,
          },
        }),
      },
      orderBy: { updatedAt: "desc" },
    });

    if (existing) {
      return existing.id;
    }

    // Create new conversation
    const conversation = await prisma.aIConversation.create({
      data: {
        userId,
        title: context?.courseName
          ? `${context.courseName} - Chat`
          : "New Conversation",
        context: context ? (context as object) : undefined,
      },
    });

    return conversation.id;
  }

  /**
   * Send a message and get AI response
   */
  async chat(
    userId: string,
    conversationId: string,
    message: string,
    role: RoleName
  ): Promise<ChatMessage> {
    // Get conversation with messages
    const conversation = await prisma.aIConversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          take: 20, // Limit context window
        },
      },
    });

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    // Check rate limit (simple implementation)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const messageCount = await prisma.aIMessage.count({
      where: {
        conversation: { userId },
        createdAt: { gte: today },
      },
    });

    const limits: Record<RoleName, number> = {
      LEARNER: 50,
      TRAINER: 100,
      ADMIN: 200,
      SUPERADMIN: 1000,
    };

    if (messageCount >= limits[role]) {
      throw new Error("Daily message limit reached");
    }

    // Build messages array for OpenAI
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: this.buildSystemPrompt(role, conversation.context as ChatContext),
      },
      ...conversation.messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      {
        role: "user",
        content: message,
      },
    ];

    // Save user message
    await prisma.aIMessage.create({
      data: {
        conversationId,
        role: "user",
        content: message,
      },
    });

    // Get AI response
    const completion = await this.openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const assistantMessage = completion.choices[0]?.message?.content || "";
    const tokensUsed = completion.usage?.total_tokens || 0;

    // Save assistant message
    const savedMessage = await prisma.aIMessage.create({
      data: {
        conversationId,
        role: "assistant",
        content: assistantMessage,
        tokensUsed,
      },
    });

    // Update conversation timestamp
    await prisma.aIConversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return {
      id: savedMessage.id,
      role: "assistant",
      content: assistantMessage,
      createdAt: savedMessage.createdAt,
    };
  }

  /**
   * Stream chat response
   */
  async *streamChat(
    userId: string,
    conversationId: string,
    message: string,
    role: RoleName
  ): AsyncGenerator<string, void, unknown> {
    const conversation = await prisma.aIConversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          take: 20,
        },
      },
    });

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: this.buildSystemPrompt(role, conversation.context as ChatContext),
      },
      ...conversation.messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      {
        role: "user",
        content: message,
      },
    ];

    // Save user message
    await prisma.aIMessage.create({
      data: {
        conversationId,
        role: "user",
        content: message,
      },
    });

    const stream = await this.openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      messages,
      temperature: 0.7,
      max_tokens: 1000,
      stream: true,
    });

    let fullResponse = "";

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      fullResponse += content;
      yield content;
    }

    // Save complete assistant message
    await prisma.aIMessage.create({
      data: {
        conversationId,
        role: "assistant",
        content: fullResponse,
      },
    });

    await prisma.aIConversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });
  }

  /**
   * Generate quiz questions
   */
  async generateQuiz(
    topic: string,
    count: number = 5,
    difficulty: "easy" | "medium" | "hard" = "medium"
  ) {
    const prompt = `Generate ${count} ${difficulty} multiple choice quiz questions about "${topic}".

Return a JSON array with this structure:
[
  {
    "question": "The question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Brief explanation of the correct answer"
  }
]

Only return the JSON array, no other text.`;

    const completion = await this.openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content || "[]";
    return JSON.parse(content);
  }

  /**
   * Generate feedback for submission
   */
  async generateFeedback(
    assignmentTitle: string,
    rubric: string,
    submission: string
  ): Promise<string> {
    const prompt = `You are grading a student submission for the assignment "${assignmentTitle}".

Rubric:
${rubric}

Student Submission:
${submission}

Provide constructive feedback that:
1. Highlights what the student did well
2. Identifies areas for improvement
3. Gives specific suggestions
4. Is encouraging and professional

Keep the feedback concise (200-300 words).`;

    const completion = await this.openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content || "";
  }

  private buildSystemPrompt(role: RoleName, context?: ChatContext): string {
    let prompt = SYSTEM_PROMPTS[role];

    if (context) {
      prompt += "\n\nCurrent Context:";
      if (context.courseName) {
        prompt += `\n- Course: ${context.courseName}`;
      }
      if (context.lessonTitle) {
        prompt += `\n- Lesson: ${context.lessonTitle}`;
      }
    }

    return prompt;
  }
}

// Export singleton instance
export const aiService = new AIService();
