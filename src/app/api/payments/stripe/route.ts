import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// This is a placeholder for Stripe integration
// In production, you would use the Stripe SDK

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { courseId, amount } = await req.json();

    if (!courseId || !amount) {
      return NextResponse.json(
        { message: "Course ID and amount are required" },
        { status: 400 }
      );
    }

    // In production, you would:
    // 1. Create a Stripe PaymentIntent
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: Math.round(amount * 100), // Stripe uses cents
    //   currency: 'usd',
    //   metadata: { courseId, userId: session.user.id }
    // });

    // 2. Or create a Checkout Session
    // const checkoutSession = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [...],
    //   mode: 'payment',
    //   success_url: `${process.env.NEXTAUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${process.env.NEXTAUTH_URL}/payment/cancel`,
    // });

    // For demo purposes, we'll simulate a successful payment
    // and create an enrollment

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        classes: {
          where: { isActive: true },
          take: 1,
        },
      },
    });

    if (!course || !course.classes[0]) {
      return NextResponse.json(
        { message: "Course or active class not found" },
        { status: 404 }
      );
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        userId: session.user.id,
        classId: course.classes[0].id,
      },
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { message: "Already enrolled in this course" },
        { status: 400 }
      );
    }

    // Create enrollment (in production, only after payment confirmation)
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: session.user.id,
        classId: course.classes[0].id,
        status: "ACTIVE",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Payment successful",
      enrollmentId: enrollment.id,
      // In production: clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe payment error:", error);
    return NextResponse.json(
      { message: "Payment processing failed" },
      { status: 500 }
    );
  }
}
