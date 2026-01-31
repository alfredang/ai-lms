import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <FileText className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: January 31, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using LearnHub&apos;s platform, website, or services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              LearnHub is an AI-powered learning management system that provides online courses, educational content, and learning tools. Our services include:
            </p>
            <ul>
              <li>Access to online courses and educational materials</li>
              <li>AI-powered learning assistance and recommendations</li>
              <li>Progress tracking and certification</li>
              <li>Community features and discussion forums</li>
              <li>Gamification elements including XP, badges, and leaderboards</li>
            </ul>

            <h2>3. Account Registration</h2>
            <p>
              To access certain features of our platform, you must create an account. You agree to:
            </p>
            <ul>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized account access</li>
              <li>Be responsible for all activities under your account</li>
              <li>Not share your account with others or create multiple accounts</li>
            </ul>

            <h2>4. User Conduct</h2>
            <p>When using our platform, you agree not to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon intellectual property rights</li>
              <li>Upload malicious code or interfere with the platform</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Share course content without authorization</li>
              <li>Use the platform for commercial purposes without permission</li>
              <li>Attempt to gain unauthorized access to any part of the platform</li>
              <li>Submit false information or impersonate others</li>
            </ul>

            <h2>5. Course Enrollment and Access</h2>
            <p>
              When you enroll in a course, you receive a limited, non-exclusive, non-transferable license to access the course content for personal, non-commercial use. This license does not include:
            </p>
            <ul>
              <li>The right to resell or redistribute course content</li>
              <li>The right to record or copy video content</li>
              <li>The right to share your account access with others</li>
            </ul>

            <h2>6. Payments and Pricing</h2>
            <p>
              Course prices are displayed on the platform and may change at any time. When you purchase a course:
            </p>
            <ul>
              <li>Payment is due at the time of purchase</li>
              <li>All prices are in USD unless otherwise stated</li>
              <li>You authorize us to charge your payment method</li>
              <li>You are responsible for any applicable taxes</li>
            </ul>

            <h2>7. Refund Policy</h2>
            <p>
              We offer a 30-day money-back guarantee on course purchases. For full details, please see our <a href="/refund" className="text-primary hover:underline">Refund Policy</a>.
            </p>

            <h2>8. Intellectual Property</h2>
            <p>
              All content on LearnHub, including courses, videos, text, graphics, logos, and software, is owned by LearnHub or our content providers and is protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written permission.
            </p>

            <h2>9. User-Generated Content</h2>
            <p>
              When you submit content to our platform (such as discussion posts, reviews, or assignments), you grant LearnHub a non-exclusive, royalty-free, worldwide license to use, display, and distribute that content. You retain ownership of your original content.
            </p>

            <h2>10. Instructor Terms</h2>
            <p>
              If you create and publish courses on LearnHub, additional terms apply:
            </p>
            <ul>
              <li>You must own or have rights to all content you upload</li>
              <li>You are responsible for the accuracy of your course content</li>
              <li>You agree to our revenue sharing arrangement</li>
              <li>You must respond to student questions in a timely manner</li>
            </ul>

            <h2>11. Disclaimers</h2>
            <p>
              Our platform is provided &quot;as is&quot; without warranties of any kind. We do not guarantee:
            </p>
            <ul>
              <li>Uninterrupted or error-free service</li>
              <li>That courses will meet your specific requirements</li>
              <li>Any specific outcomes from completing courses</li>
              <li>The accuracy of all user-generated content</li>
            </ul>

            <h2>12. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, LearnHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our platform.
            </p>

            <h2>13. Termination</h2>
            <p>
              We may terminate or suspend your account at any time for violations of these terms. You may also delete your account at any time. Upon termination, your access to courses and content will be revoked.
            </p>

            <h2>14. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which LearnHub operates, without regard to conflict of law principles.
            </p>

            <h2>15. Changes to Terms</h2>
            <p>
              We may modify these terms at any time. We will notify users of significant changes via email or platform notification. Continued use of the platform after changes constitutes acceptance of the new terms.
            </p>

            <h2>16. Contact Information</h2>
            <p>
              For questions about these terms, please contact us at:
            </p>
            <ul>
              <li>Email: legal@learnhub.com</li>
              <li>Address: 123 Learning Street, Education City, EC 12345</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
