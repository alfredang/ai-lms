import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  Trophy,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  BookOpen,
  Target,
  Brain,
  Clock,
  User,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeroButtons, CTAButtons } from "@/components/home/hero-buttons";

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
  { name: "Gen AI & Agentic AI", count: 45, color: "bg-purple-500", icon: "🤖" },
  { name: "Vibe Coding", count: 32, color: "bg-cyan-500", icon: "💻" },
  { name: "Investment", count: 28, color: "bg-green-500", icon: "📈" },
  { name: "Soft Skills", count: 38, color: "bg-orange-500", icon: "🎯" },
  { name: "Marketing", count: 42, color: "bg-pink-500", icon: "📣" },
];

const sampleCourses = [
  {
    id: "1",
    title: "Building AI Agents with LangChain",
    category: "Gen AI & Agentic AI",
    instructor: "Dr. Sarah Chen",
    rating: 4.9,
    students: 2450,
    price: 99,
    image: "/courses/ai-agents.jpg",
    level: "Intermediate",
    duration: "12 hours",
  },
  {
    id: "2",
    title: "Prompt Engineering Masterclass",
    category: "Gen AI & Agentic AI",
    instructor: "Alex Rodriguez",
    rating: 4.8,
    students: 3200,
    price: 79,
    image: "/courses/prompt-eng.jpg",
    level: "Beginner",
    duration: "8 hours",
  },
  {
    id: "3",
    title: "Claude & ChatGPT API Development",
    category: "Gen AI & Agentic AI",
    instructor: "Mike Johnson",
    rating: 4.7,
    students: 1890,
    price: 89,
    image: "/courses/api-dev.jpg",
    level: "Intermediate",
    duration: "10 hours",
  },
  {
    id: "4",
    title: "Modern React with AI Tools",
    category: "Vibe Coding",
    instructor: "Emma Wilson",
    rating: 4.9,
    students: 4100,
    price: 119,
    image: "/courses/react-ai.jpg",
    level: "Intermediate",
    duration: "15 hours",
  },
  {
    id: "5",
    title: "Full-Stack Development with Cursor",
    category: "Vibe Coding",
    instructor: "James Lee",
    rating: 4.8,
    students: 2800,
    price: 149,
    image: "/courses/cursor-dev.jpg",
    level: "Advanced",
    duration: "20 hours",
  },
  {
    id: "6",
    title: "Building Apps with Claude Code",
    category: "Vibe Coding",
    instructor: "Lisa Park",
    rating: 4.9,
    students: 1560,
    price: 99,
    image: "/courses/claude-code.jpg",
    level: "Beginner",
    duration: "10 hours",
  },
  {
    id: "7",
    title: "Stock Market Fundamentals",
    category: "Investment",
    instructor: "David Chen",
    rating: 4.7,
    students: 5200,
    price: 69,
    image: "/courses/stocks.jpg",
    level: "Beginner",
    duration: "8 hours",
  },
  {
    id: "8",
    title: "Crypto & DeFi Investing",
    category: "Investment",
    instructor: "Rachel Kim",
    rating: 4.6,
    students: 3400,
    price: 89,
    image: "/courses/crypto.jpg",
    level: "Intermediate",
    duration: "12 hours",
  },
  {
    id: "9",
    title: "Real Estate Investment Strategies",
    category: "Investment",
    instructor: "Michael Brown",
    rating: 4.8,
    students: 2100,
    price: 129,
    image: "/courses/real-estate.jpg",
    level: "Advanced",
    duration: "16 hours",
  },
  {
    id: "10",
    title: "Leadership & Team Management",
    category: "Soft Skills",
    instructor: "Jennifer Adams",
    rating: 4.9,
    students: 6800,
    price: 59,
    image: "/courses/leadership.jpg",
    level: "Beginner",
    duration: "6 hours",
  },
  {
    id: "11",
    title: "Effective Communication",
    category: "Soft Skills",
    instructor: "Tom Harris",
    rating: 4.8,
    students: 4500,
    price: 49,
    image: "/courses/communication.jpg",
    level: "Beginner",
    duration: "5 hours",
  },
  {
    id: "12",
    title: "Negotiation & Persuasion",
    category: "Soft Skills",
    instructor: "Amanda White",
    rating: 4.7,
    students: 3200,
    price: 79,
    image: "/courses/negotiation.jpg",
    level: "Intermediate",
    duration: "8 hours",
  },
  {
    id: "13",
    title: "Digital Marketing Mastery",
    category: "Marketing",
    instructor: "Chris Taylor",
    rating: 4.8,
    students: 7200,
    price: 99,
    image: "/courses/digital-marketing.jpg",
    level: "Beginner",
    duration: "14 hours",
  },
  {
    id: "14",
    title: "Social Media Strategy",
    category: "Marketing",
    instructor: "Nicole Garcia",
    rating: 4.7,
    students: 5100,
    price: 79,
    image: "/courses/social-media.jpg",
    level: "Intermediate",
    duration: "10 hours",
  },
  {
    id: "15",
    title: "SEO & Content Marketing",
    category: "Marketing",
    instructor: "Kevin Martinez",
    rating: 4.9,
    students: 4300,
    price: 89,
    image: "/courses/seo.jpg",
    level: "Intermediate",
    duration: "12 hours",
  },
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
            <HeroButtons />
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
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/courses?category=${category.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                className="group"
              >
                <Card className="transition-all hover:shadow-lg hover:border-primary">
                  <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl ${category.color} text-2xl`}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.count} courses
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Featured Courses
              </h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Hand-picked courses to accelerate your learning
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/courses">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sampleCourses.slice(0, 6).map((course) => (
              <Link
                key={course.id}
                href={`/courses?category=${course.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                className="group"
              >
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-purple-600/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GraduationCap className="h-16 w-16 text-primary/40" />
                    </div>
                    <Badge className="absolute left-3 top-3" variant="secondary">
                      {course.category}
                    </Badge>
                    <Badge className="absolute right-3 top-3 bg-green-500 text-white">
                      {course.level}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-primary">
                      {course.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      {course.instructor}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{course.rating}</span>
                        <span className="text-muted-foreground">
                          ({course.students.toLocaleString()})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t pt-4">
                      <span className="text-2xl font-bold text-primary">
                        ${course.price}
                      </span>
                      <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                        Learn More
                      </Button>
                    </div>
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
            <CTAButtons />
          </div>
        </div>
      </section>
    </div>
  );
}
