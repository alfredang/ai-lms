import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { GamificationService } from "@/services/gamification.service";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { lessonId, enrollmentId } = await req.json();

    if (!lessonId || !enrollmentId) {
      return NextResponse.json(
        { message: "lessonId and enrollmentId are required" },
        { status: 400 }
      );
    }

    // Verify the enrollment belongs to the user
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        id: enrollmentId,
        userId: session.user.id,
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { message: "Enrollment not found" },
        { status: 404 }
      );
    }

    // Check if already completed
    const existing = await prisma.lessonProgress.findUnique({
      where: {
        lessonId_enrollmentId: {
          lessonId,
          enrollmentId,
        },
      },
    });

    if (existing?.isCompleted) {
      return NextResponse.json(
        { message: "Lesson already completed" },
        { status: 200 }
      );
    }

    // Create or update lesson progress
    const lessonProgress = await prisma.lessonProgress.upsert({
      where: {
        lessonId_enrollmentId: {
          lessonId,
          enrollmentId,
        },
      },
      update: {
        isCompleted: true,
        completedAt: new Date(),
      },
      create: {
        lessonId,
        enrollmentId,
        isCompleted: true,
        completedAt: new Date(),
        timeSpent: 0,
      },
    });

    // Award XP for completing the lesson
    try {
      await GamificationService.awardXP(
        session.user.id,
        "LESSON_COMPLETE",
        { lessonId, enrollmentId }
      );
    } catch (error) {
      console.error("Failed to award XP:", error);
      // Don't fail the request if XP awarding fails
    }

    return NextResponse.json({
      message: "Lesson marked as complete",
      lessonProgress,
    });
  } catch (error) {
    console.error("Error completing lesson:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
