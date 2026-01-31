import Link from "next/link";
import { HelpCircle, ChevronDown, MessageSquare, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqCategories = [
  {
    title: "General Questions",
    faqs: [
      {
        question: "What is LearnHub?",
        answer:
          "LearnHub is an AI-powered learning management system designed to help you learn smarter. We offer courses across various categories including Real Estate, Investment, Soft Skills, AI & Machine Learning, Full Stack Development, and Cloud Computing. Our platform features personalized learning paths, gamification, and expert instructors.",
      },
      {
        question: "Is LearnHub free to use?",
        answer:
          "LearnHub offers both free and premium courses. You can create an account and access our free courses without any payment. Premium courses require a one-time purchase or subscription. We also offer a 30-day money-back guarantee on all paid courses.",
      },
      {
        question: "How do I get started?",
        answer:
          "Getting started is easy! Simply create an account using your email or social login, browse our course catalog, and enroll in a course that interests you. Our AI assistant will help guide you through the learning process and recommend courses based on your goals.",
      },
    ],
  },
  {
    title: "Courses & Learning",
    faqs: [
      {
        question: "How long do I have access to a course?",
        answer:
          "Once you enroll in a course, you have lifetime access to all course materials. You can learn at your own pace and revisit the content as many times as you need. This includes any future updates the instructor makes to the course.",
      },
      {
        question: "Can I download course materials?",
        answer:
          "Yes, most course materials including PDFs, slides, and resources can be downloaded for offline learning. Video content is available for streaming but may have download restrictions depending on the course. Check individual course details for specific download options.",
      },
      {
        question: "Do I get a certificate after completing a course?",
        answer:
          "Yes! Upon successful completion of a course, you will receive a digital certificate that you can share on LinkedIn, add to your resume, or download as a PDF. Certificates include a unique verification code that employers can use to verify authenticity.",
      },
      {
        question: "What if I get stuck on a lesson?",
        answer:
          "Our AI learning assistant is available 24/7 to help answer your questions and explain concepts. You can also participate in course discussions, ask questions to instructors, and connect with other learners in our community forums.",
      },
    ],
  },
  {
    title: "Payments & Refunds",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers in select regions. All payments are processed securely using industry-standard encryption.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Yes, we offer a 30-day money-back guarantee on all paid courses. If you are not satisfied with a course for any reason, you can request a full refund within 30 days of purchase. Simply contact our support team and we will process your refund within 5-7 business days.",
      },
      {
        question: "Do you offer team or enterprise pricing?",
        answer:
          "Yes! We offer special pricing for teams and enterprises. Contact our sales team for volume discounts, custom learning paths, and dedicated account management. We also provide detailed analytics and reporting for team administrators.",
      },
    ],
  },
  {
    title: "Technical Questions",
    faqs: [
      {
        question: "What are the system requirements?",
        answer:
          "LearnHub works on any modern web browser (Chrome, Firefox, Safari, Edge) on desktop or mobile devices. For the best experience, we recommend a stable internet connection of at least 5 Mbps for video streaming. Our mobile apps are available for iOS and Android.",
      },
      {
        question: "Why is my video not playing?",
        answer:
          "If you are experiencing video playback issues, try: 1) Refreshing the page, 2) Clearing your browser cache, 3) Trying a different browser, 4) Checking your internet connection. If the issue persists, please contact our support team.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Click on the 'Forgot Password' link on the login page. Enter your registered email address, and we will send you a password reset link. The link is valid for 24 hours. If you do not receive the email, check your spam folder or contact support.",
      },
    ],
  },
  {
    title: "Instructors & Content Creation",
    faqs: [
      {
        question: "How can I become an instructor?",
        answer:
          "We welcome qualified professionals to join our instructor community. Apply through our 'Become an Instructor' page with your expertise area, teaching experience, and a course outline. Our team will review your application within 7-10 business days.",
      },
      {
        question: "What is the revenue share for instructors?",
        answer:
          "Instructors earn competitive revenue shares on course sales. The exact percentage depends on factors like course quality, pricing, and promotional activities. Contact our instructor relations team for detailed information about our revenue sharing model.",
      },
    ],
  },
];

export default function FAQsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <HelpCircle className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 text-4xl font-bold tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Find answers to common questions about LearnHub
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {faqCategories.map((category) => (
            <div key={category.title} className="mb-12">
              <h2 className="mb-6 text-2xl font-bold">{category.title}</h2>
              <div className="space-y-4">
                {category.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-lg border bg-background"
                  >
                    <summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
                      {faq.question}
                      <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t px-4 py-4 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 text-2xl font-bold">Still have questions?</h2>
            <p className="mt-2 text-muted-foreground">
              Cannot find the answer you are looking for? Contact our support team.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/help">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Browse Help Center
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
