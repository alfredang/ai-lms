import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { classId } = body;

    if (!classId) {
      return NextResponse.json(
        { error: "Class ID is required" },
        { status: 400 }
      );
    }

    // Check if the class exists and is active
    const classExists = await prisma.class.findUnique({
      where: { id: classId, isActive: true },
      include: {
        course: true,
        _count: {
          select: { enrollments: true },
        },
      },
    });

    if (!classExists) {
      return NextResponse.json(
        { error: "Class not found or not available" },
        { status: 404 }
      );
    }

    // Check if the class is full
    if (classExists._count.enrollments >= classExists.maxStudents) {
      return NextResponse.json(
        { error: "This class is full. Please try another class." },
        { status: 400 }
      );
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_classId: {
          userId: session.user.id,
          classId,
        },
      },
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { error: "You are already enrolled in this class" },
        { status: 400 }
      );
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: session.user.id,
        classId,
        status: "ACTIVE",
      },
    });

    // Award XP for enrollment
    const gamificationProfile = await prisma.gamificationProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (gamificationProfile) {
      await prisma.gamificationProfile.update({
        where: { userId: session.user.id },
        data: {
          totalXp: { increment: 25 },
          lastActivityAt: new Date(),
        },
      });

      await prisma.xPTransaction.create({
        data: {
          profileId: gamificationProfile.id,
          amount: 25,
          reason: `Enrolled in ${classExists.course.title}`,
        },
      });
    }

    // Create a notification
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        type: "ENROLLMENT",
        title: "Successfully Enrolled!",
        message: `You have been enrolled in ${classExists.course.title}`,
        link: `/learner/courses/${classExists.course.slug}`,
      },
    });

    return NextResponse.json({
      success: true,
      enrollmentId: enrollment.id,
      courseSlug: classExists.course.slug,
      message: "Successfully enrolled!",
    });
  } catch (error) {
    console.error("Enrollment error:", error);
    return NextResponse.json(
      { error: "An error occurred during enrollment" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { userId: session.user.id },
      include: {
        class: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                slug: true,
                thumbnail: true,
                difficulty: true,
                deliveryFormat: true,
                sessionType: true,
              },
            },
            trainer: {
              select: { name: true },
            },
            _count: {
              select: { lessons: true },
            },
          },
        },
      },
      orderBy: { enrolledAt: "desc" },
    });

    return NextResponse.json({ enrollments });
  } catch (error) {
    console.error("Get enrollments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch enrollments" },
      { status: 500 }
    );
  }
}
