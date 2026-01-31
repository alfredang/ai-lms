import { RotateCcw, CheckCircle, XCircle, Clock, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function RefundPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <RotateCcw className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Refund Policy</h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: January 31, 2026
          </p>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-12 border-b">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="mx-auto h-10 w-10 text-primary" />
                <h3 className="mt-4 font-semibold">30-Day Guarantee</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Request a refund within 30 days of purchase
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="mx-auto h-10 w-10 text-green-500" />
                <h3 className="mt-4 font-semibold">Full Refund</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Get 100% of your money back, no questions asked
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="mx-auto h-10 w-10 text-blue-500" />
                <h3 className="mt-4 font-semibold">Quick Processing</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Refunds processed within 5-7 business days
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>Our Commitment</h2>
            <p>
              At LearnHub, we want you to be completely satisfied with your learning experience. If you are not happy with a course for any reason, we offer a hassle-free 30-day money-back guarantee.
            </p>

            <h2>30-Day Money-Back Guarantee</h2>
            <p>
              If you are unsatisfied with a course, you can request a full refund within 30 days of purchase. No questions asked. We believe in the quality of our courses and want you to learn with confidence.
            </p>

            <h2>Eligibility for Refund</h2>
            <h3>You ARE eligible for a refund if:</h3>
            <ul>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                Your request is within 30 days of purchase
              </li>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                You have not completed more than 30% of the course
              </li>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                You have not downloaded course certificates
              </li>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                This is your first refund request for this course
              </li>
            </ul>

            <h3>You are NOT eligible for a refund if:</h3>
            <ul>
              <li>
                <XCircle className="inline h-4 w-4 text-red-500 mr-2" />
                More than 30 days have passed since purchase
              </li>
              <li>
                <XCircle className="inline h-4 w-4 text-red-500 mr-2" />
                You have completed more than 30% of the course content
              </li>
              <li>
                <XCircle className="inline h-4 w-4 text-red-500 mr-2" />
                You have already received a certificate for the course
              </li>
              <li>
                <XCircle className="inline h-4 w-4 text-red-500 mr-2" />
                You have previously received a refund for the same course
              </li>
              <li>
                <XCircle className="inline h-4 w-4 text-red-500 mr-2" />
                The course was purchased with a promotional code offering more than 50% discount
              </li>
            </ul>

            <h2>How to Request a Refund</h2>
            <ol>
              <li>
                <strong>Contact Support:</strong> Send an email to refunds@learnhub.com or use our contact form
              </li>
              <li>
                <strong>Provide Details:</strong> Include your account email, course name, and order number
              </li>
              <li>
                <strong>Reason (Optional):</strong> While not required, feedback helps us improve our courses
              </li>
              <li>
                <strong>Confirmation:</strong> You will receive a confirmation email within 24-48 hours
              </li>
              <li>
                <strong>Processing:</strong> Refunds are processed within 5-7 business days
              </li>
            </ol>

            <h2>Refund Methods</h2>
            <p>
              Refunds will be issued to the original payment method used for the purchase:
            </p>
            <ul>
              <li><strong>Credit/Debit Cards:</strong> 5-7 business days to appear on your statement</li>
              <li><strong>PayPal:</strong> 3-5 business days</li>
              <li><strong>Bank Transfer:</strong> 7-10 business days</li>
            </ul>

            <h2>Subscription Refunds</h2>
            <p>
              For subscription plans:
            </p>
            <ul>
              <li>Monthly subscriptions can be cancelled at any time</li>
              <li>No refunds for partial months</li>
              <li>Annual subscriptions may be eligible for prorated refunds within the first 30 days</li>
              <li>Access continues until the end of the current billing period</li>
            </ul>

            <h2>Bundle and Course Pack Refunds</h2>
            <p>
              If you purchased a bundle or course pack:
            </p>
            <ul>
              <li>Full refund is available within 30 days if less than 30% of total content is consumed</li>
              <li>Partial refunds may be available for individual courses within a bundle</li>
              <li>Contact support for bundle-specific refund calculations</li>
            </ul>

            <h2>Exceptions</h2>
            <p>
              We may make exceptions to this policy in certain circumstances, including:
            </p>
            <ul>
              <li>Technical issues that prevented course access</li>
              <li>Course content significantly different from description</li>
              <li>Duplicate purchases made in error</li>
            </ul>

            <h2>Abuse Prevention</h2>
            <p>
              We reserve the right to deny refund requests if we detect abuse of our refund policy, including:
            </p>
            <ul>
              <li>Excessive refund requests</li>
              <li>Completing courses and then requesting refunds</li>
              <li>Sharing course content before requesting a refund</li>
            </ul>

            <h2>Contact Us</h2>
            <p>
              If you have questions about our refund policy or need assistance with a refund request:
            </p>
            <ul>
              <li>Email: refunds@learnhub.com</li>
              <li>Support Hours: Monday-Friday, 9 AM - 6 PM EST</li>
              <li>Response Time: Within 24-48 hours</li>
            </ul>
          </div>

          <div className="mt-12 flex justify-center gap-4">
            <Button asChild>
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" />
                Contact Support
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/help">View Help Center</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
