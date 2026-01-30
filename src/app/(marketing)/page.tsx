import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  Trophy,
  Users,
  Play,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  BookOpen,
  Target,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description:
      "Get personalized learning paths and instant help from our AI assistant that adapts to your learning style.",
  },
  {
    icon: Trophy,
    title: "Gamification",
    description:
      "Earn XP, unlock badges, and climb leaderboards as you progress through your courses.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description:
      "Learn from industry professionals with real-world experience and proven teaching methods.",
  },
  {
    icon: Target,
    title: "Track Progress",
    description:
      "Monitor your learning journey with detailed analytics and progress tracking.",
  },
  {
    icon: BookOpen,
    title: "Rich Content",
    description:
      "Access video lectures, interactive quizzes, PDF materials, and hands-on projects.",
  },
  {
    icon: Zap,
    title: "Micro-Learning",
    description:
      "Bite-sized lessons designed for busy schedules. Learn anytime, anywhere.",
  },
];

const stats = [
  { value: "50K+", label: "Active Learners" },
  { value: "500+", label: "Courses" },
  { value: "100+", label: "Expert Instructors" },
  { value: "95%", label: "Satisfaction Rate" },
];

const testimonials = [
  {
    content:
      "LearnHub transformed my career. The AI-powered recommendations helped me focus on exactly what I needed to learn.",
    author: "Sarah Chen",
    role: "Software Engineer at Google",
    avatar: "SC",
  },
  {
    content:
      "The gamification features kept me motivated throughout my learning journey. I've never been so engaged with online courses!",
    author: "Marcus Johnson",
    role: "Product Manager",
    avatar: "MJ",
  },
  {
    content:
      "As an instructor, the platform makes it easy to create engaging content and track student progress effectively.",
    author: "Dr. Emily Watson",
    role: "Course Instructor",
    avatar: "EW",
  },
];

const categories = [
  { name: "Web Development", count: 120, color: "bg-blue-500" },
  { name: "Data Science", count: 85, color: "bg-green-500" },
  { name: "Mobile Development", count: 64, color: "bg-purple-500" },
  { name: "Cloud Computing", count: 52, color: "bg-orange-500" },
  { name: "DevOps", count: 48, color: "bg-pink-500" },
  { name: "AI & Machine Learning", count: 76, color: "bg-cyan-500" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5 py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="mr-1 h-3 w-3" />
              AI-Powered Learning Platform
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Learn Smarter, Not Harder with{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                LearnHub
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Unlock your potential with personalized AI-powered courses,
              gamified learning experiences, and expert-led instruction. Join
              thousands of learners transforming their careers.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/courses">
                  <Play className="mr-2 h-4 w-4" />
                  Browse Courses
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Free courses available
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to succeed
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our platform combines cutting-edge AI technology with proven
              learning methodologies to help you achieve your goals faster.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="border-0 bg-muted/50 transition-colors hover:bg-muted"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-muted/30 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Explore Popular Categories
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Browse courses across various categories and find the perfect
              learning path for your career goals.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/courses?category=${category.name.toLowerCase().replace(/ /g, "-")}`}
                className="group"
              >
                <Card className="transition-all hover:shadow-lg">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg ${category.color}`}
                    >
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-primary">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.count} courses
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Loved by learners worldwide
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See what our community has to say about their learning experience.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.author} className="relative">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{testimonial.content}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-br from-primary/10 via-background to-primary/10 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Start your learning journey today
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of learners who are already transforming their
              careers with LearnHub.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/register">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/courses">View All Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
