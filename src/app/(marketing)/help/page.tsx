import Link from "next/link";
import {
  HelpCircle,
  BookOpen,
  MessageSquare,
  Mail,
  Video,
  FileText,
  Users,
  Settings,
  CreditCard,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const helpCategories = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Learn the basics of using LearnHub",
    articles: [
      "How to create an account",
      "Enrolling in your first course",
      "Navigating the dashboard",
      "Setting up your profile",
    ],
  },
  {
    icon: Video,
    title: "Courses & Learning",
    description: "Everything about taking courses",
    articles: [
      "How to access course materials",
      "Completing lessons and assignments",
      "Downloading certificates",
      "Tracking your progress",
    ],
  },
  {
    icon: CreditCard,
    title: "Billing & Payments",
    description: "Payment and subscription help",
    articles: [
      "Payment methods accepted",
      "Refund policy",
      "Managing subscriptions",
      "Invoice and receipts",
    ],
  },
  {
    icon: Settings,
    title: "Account Settings",
    description: "Manage your account preferences",
    articles: [
      "Changing your password",
      "Notification preferences",
      "Privacy settings",
      "Deleting your account",
    ],
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Keep your account secure",
    articles: [
      "Two-factor authentication",
      "Recognizing phishing attempts",
      "Data privacy practices",
      "Reporting security issues",
    ],
  },
  {
    icon: Users,
    title: "Instructors & Trainers",
    description: "Help for course creators",
    articles: [
      "Creating your first course",
      "Adding lessons and materials",
      "Managing students",
      "Analytics and insights",
    ],
  },
];

const popularArticles = [
  "How do I reset my password?",
  "Can I get a refund for a course?",
  "How do I download my certificate?",
  "Why is my video not playing?",
  "How do I contact support?",
];

export default function HelpPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <HelpCircle className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 text-4xl font-bold tracking-tight">
              How can we help you?
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Search our help center or browse categories below
            </p>
            <div className="mt-6">
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full max-w-md rounded-lg border bg-background px-4 py-3 text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold">Browse by Category</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {helpCategories.map((category) => (
              <Card key={category.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.map((article) => (
                      <li key={article}>
                        <Link
                          href="#"
                          className="flex items-center text-sm text-muted-foreground hover:text-primary"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          {article}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold">Popular Articles</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popularArticles.map((article) => (
              <Link
                key={article}
                href="#"
                className="flex items-center justify-between rounded-lg border bg-background p-4 hover:border-primary"
              >
                <span>{article}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-purple-600/10 p-8 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 text-2xl font-bold">Still need help?</h2>
            <p className="mt-2 text-muted-foreground">
              Our support team is available 24/7 to assist you
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/community">
                  <Users className="mr-2 h-4 w-4" />
                  Ask Community
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
