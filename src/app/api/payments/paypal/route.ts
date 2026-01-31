import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// This is a placeholder for PayPal integration
// In production, you would use the PayPal SDK

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
    // 1. Create a PayPal order
    // const paypal = require('@paypal/checkout-server-sdk');
    // const environment = new paypal.core.SandboxEnvironment(
    //   process.env.PAYPAL_CLIENT_ID,
    //   process.env.PAYPAL_CLIENT_SECRET
    // );
    // const client = new paypal.core.PayPalHttpClient(environment);

    // const request = new paypal.orders.OrdersCreateRequest();
    // request.requestBody({
    //   intent: 'CAPTURE',
    //   purchase_units: [{
    //     amount: {
    //       currency_code: 'USD',
    //       value: amount.toString()
    //     },
    //     description: 'Course purchase',
    //     custom_id: courseId
    //   }],
    //   application_context: {
    //     return_url: `${process.env.NEXTAUTH_URL}/payment/paypal/success`,
    //     cancel_url: `${process.env.NEXTAUTH_URL}/payment/paypal/cancel`
    //   }
    // });

    // const response = await client.execute(request);
    // const approvalUrl = response.result.links.find(link => link.rel === 'approve').href;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    // For demo purposes, return a mock approval URL
    // In production, this would be the actual PayPal approval URL
    return NextResponse.json({
      success: true,
      orderId: `DEMO-${Date.now()}`,
      approvalUrl: `/payment/paypal/demo?courseId=${courseId}&amount=${amount}`,
      // In production: approvalUrl: approvalUrl
    });
  } catch (error) {
    console.error("PayPal payment error:", error);
    return NextResponse.json(
      { message: "PayPal processing failed" },
      { status: 500 }
    );
  }
}

// Webhook handler for PayPal IPN (Instant Payment Notification)
export async function PUT(req: Request) {
  try {
    const { orderId, courseId, userId } = await req.json();

    // In production, verify the payment with PayPal
    // const request = new paypal.orders.OrdersCaptureRequest(orderId);
    // const capture = await client.execute(request);

    // if (capture.result.status === 'COMPLETED') {
    //   // Create enrollment
    // }

    // For demo, simulate successful capture
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        classes: {
          where: { isActive: true },
          take: 1,
        },
      },
    });

    if (!course?.classes[0]) {
      return NextResponse.json(
        { message: "No active class found" },
        { status: 404 }
      );
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        classId: course.classes[0].id,
        status: "ACTIVE",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Payment captured successfully",
      enrollmentId: enrollment.id,
    });
  } catch (error) {
    console.error("PayPal capture error:", error);
    return NextResponse.json(
      { message: "Payment capture failed" },
      { status: 500 }
    );
  }
}
