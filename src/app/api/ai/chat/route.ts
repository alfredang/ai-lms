import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { aiService } from "@/services/ai.service";
import { prisma } from "@/lib/prisma";
import type { RoleName } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { message, conversationId, context } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { message: "Message is required" },
        { status: 400 }
      );
    }

    // Get user's role
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { role: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Get or create conversation
    let activeConversationId = conversationId;

    if (!activeConversationId) {
      activeConversationId = await aiService.getOrCreateConversation(
        session.user.id,
        context
      );
    }

    // Send message and get response
    const response = await aiService.chat(
      session.user.id,
      activeConversationId,
      message,
      user.role.name as RoleName
    );

    return NextResponse.json({
      conversationId: activeConversationId,
      message: response,
    });
  } catch (error) {
    console.error("AI Chat error:", error);

    if (error instanceof Error && error.message === "Daily message limit reached") {
      return NextResponse.json(
        { message: "Daily message limit reached. Please try again tomorrow." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { message: "Failed to process message" },
      { status: 500 }
    );
  }
}
