import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { gamificationService } from "@/services/gamification.service";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { assignmentId, enrollmentId, content, fileUrl } = await req.json();

    if (!assignmentId || !enrollmentId || !content) {
      return NextResponse.json(
        { message: "assignmentId, enrollmentId, and content are required" },
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

    // Check if assignment exists and is published
    const assignment = await prisma.assignment.findUnique({
      where: {
        id: assignmentId,
        isPublished: true,
      },
    });

    if (!assignment) {
      return NextResponse.json(
        { message: "Assignment not found" },
        { status: 404 }
      );
    }

    // Check for existing submission
    const existingSubmission = await prisma.submission.findUnique({
      where: {
        assignmentId_userId: {
          assignmentId,
          userId: session.user.id,
        },
      },
    });

    if (existingSubmission) {
      return NextResponse.json(
        { message: "You have already submitted this assignment" },
        { status: 400 }
      );
    }

    // Create submission
    const submission = await prisma.submission.create({
      data: {
        content,
        fileUrl: fileUrl || null,
        status: "SUBMITTED",
        submittedAt: new Date(),
        assignmentId,
        enrollmentId,
        userId: session.user.id,
      },
    });

    // Award XP for submitting assignment
    try {
      await gamificationService.awardXP(session.user.id, {
        amount: 25,
        reason: "Submitted an assignment",
        metadata: { assignmentId, submissionId: submission.id },
      });
    } catch (error) {
      console.error("Failed to award XP:", error);
      // Don't fail the request if XP awarding fails
    }

    return NextResponse.json({
      message: "Assignment submitted successfully",
      submission,
    });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
    }
}
