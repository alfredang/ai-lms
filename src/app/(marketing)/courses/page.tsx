import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clock, Users, BarChart3, Star, User, GraduationCap } from "lucide-react";

// Sample courses data for demo
const sampleCourses = [
  {
    id: "1",
    title: "Building AI Agents with LangChain",
    category: "gen-ai-agentic-ai",
    categoryName: "Gen AI & Agentic AI",
    instructor: "Dr. Sarah Chen",
    rating: 4.9,
    students: 2450,
    price: 99,
    level: "Intermediate",
    duration: "12 hours",
    description: "Learn to build powerful AI agents using LangChain, from basic concepts to advanced autonomous systems.",
  },
  {
    id: "2",
    title: "Prompt Engineering Masterclass",
    category: "gen-ai-agentic-ai",
    categoryName: "Gen AI & Agentic AI",
    instructor: "Alex Rodriguez",
    rating: 4.8,
    students: 3200,
    price: 79,
    level: "Beginner",
    duration: "8 hours",
    description: "Master the art of prompt engineering to get the best results from ChatGPT, Claude, and other LLMs.",
  },
  {
    id: "3",
    title: "Claude & ChatGPT API Development",
    category: "gen-ai-agentic-ai",
    categoryName: "Gen AI & Agentic AI",
    instructor: "Mike Johnson",
    rating: 4.7,
    students: 1890,
    price: 89,
    level: "Intermediate",
    duration: "10 hours",
    description: "Build production-ready applications using the Claude and OpenAI APIs with best practices.",
  },
  {
    id: "4",
    title: "Modern React with AI Tools",
    category: "vibe-coding",
    categoryName: "Vibe Coding",
    instructor: "Emma Wilson",
    rating: 4.9,
    students: 4100,
    price: 119,
    level: "Intermediate",
    duration: "15 hours",
    description: "Learn modern React development enhanced with AI coding assistants for 10x productivity.",
  },
  {
    id: "5",
    title: "Full-Stack Development with Cursor",
    category: "vibe-coding",
    categoryName: "Vibe Coding",
    instructor: "James Lee",
    rating: 4.8,
    students: 2800,
    price: 149,
    level: "Advanced",
    duration: "20 hours",
    description: "Master full-stack development using Cursor AI to build applications faster than ever.",
  },
  {
    id: "6",
    title: "Building Apps with Claude Code",
    category: "vibe-coding",
    categoryName: "Vibe Coding",
    instructor: "Lisa Park",
    rating: 4.9,
    students: 1560,
    price: 99,
    level: "Beginner",
    duration: "10 hours",
    description: "Create complete applications from scratch using Claude Code's AI-powered development.",
  },
  {
    id: "7",
    title: "Stock Market Fundamentals",
    category: "investment",
    categoryName: "Investment",
    instructor: "David Chen",
    rating: 4.7,
    students: 5200,
    price: 69,
    level: "Beginner",
    duration: "8 hours",
    description: "Learn the fundamentals of stock market investing, from reading charts to building portfolios.",
  },
  {
    id: "8",
    title: "Crypto & DeFi Investing",
    category: "investment",
    categoryName: "Investment",
    instructor: "Rachel Kim",
    rating: 4.6,
    students: 3400,
    price: 89,
    level: "Intermediate",
    duration: "12 hours",
    description: "Navigate the world of cryptocurrency and decentralized finance with confidence.",
  },
  {
    id: "9",
    title: "Real Estate Investment Strategies",
    category: "investment",
    categoryName: "Investment",
    instructor: "Michael Brown",
    rating: 4.8,
    students: 2100,
    price: 129,
    level: "Advanced",
    duration: "16 hours",
    description: "Comprehensive guide to real estate investing, from rental properties to REITs.",
  },
  {
    id: "10",
    title: "Leadership & Team Management",
    category: "soft-skills",
    categoryName: "Soft Skills",
    instructor: "Jennifer Adams",
    rating: 4.9,
    students: 6800,
    price: 59,
    level: "Beginner",
    duration: "6 hours",
    description: "Develop essential leadership skills to inspire and manage high-performing teams.",
  },
  {
    id: "11",
    title: "Effective Communication",
    category: "soft-skills",
    categoryName: "Soft Skills",
    instructor: "Tom Harris",
    rating: 4.8,
    students: 4500,
    price: 49,
    level: "Beginner",
    duration: "5 hours",
    description: "Master the art of communication in professional and personal settings.",
  },
  {
    id: "12",
    title: "Negotiation & Persuasion",
    category: "soft-skills",
    categoryName: "Soft Skills",
    instructor: "Amanda White",
    rating: 4.7,
    students: 3200,
    price: 79,
    level: "Intermediate",
    duration: "8 hours",
    description: "Learn proven negotiation techniques used by top business professionals.",
  },
  {
    id: "13",
    title: "Digital Marketing Mastery",
    category: "marketing",
    categoryName: "Marketing",
    instructor: "Chris Taylor",
    rating: 4.8,
    students: 7200,
    price: 99,
    level: "Beginner",
    duration: "14 hours",
    description: "Complete digital marketing course covering SEO, PPC, social media, and email marketing.",
  },
  {
    id: "14",
    title: "Social Media Strategy",
    category: "marketing",
    categoryName: "Marketing",
    instructor: "Nicole Garcia",
    rating: 4.7,
    students: 5100,
    price: 79,
    level: "Intermediate",
    duration: "10 hours",
    description: "Build a winning social media strategy that drives engagement and conversions.",
  },
  {
    id: "15",
    title: "SEO & Content Marketing",
    category: "marketing",
    categoryName: "Marketing",
    instructor: "Kevin Martinez",
    rating: 4.9,
    students: 4300,
    price: 89,
    level: "Intermediate",
    duration: "12 hours",
    description: "Dominate search rankings and create content that attracts and converts.",
  },
];

const categories = [
  { slug: "gen-ai-agentic-ai", name: "Gen AI & Agentic AI", icon: "🤖" },
  { slug: "vibe-coding", name: "Vibe Coding", icon: "💻" },
  { slug: "investment", name: "Investment", icon: "📈" },
  { slug: "soft-skills", name: "Soft Skills", icon: "🎯" },
  { slug: "marketing", name: "Marketing", icon: "📣" },
];

const levelColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Advanced: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

async function getDbCourses() {
  try {
    const courses = await prisma.course.findMany({
      where: { isPublished: true },
      include: {
        category: true,
        createdBy: {
          select: { name: true },
        },
        classes: {
          where: { isActive: true },
          select: {
            _count: {
              select: { enrollments: true },
            },
          },
        },
      },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });
    return courses;
  } catch {
    return [];
  }
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const dbCourses = await getDbCourses();

  // Filter sample courses by category
  const filteredSampleCourses = params.category
    ? sampleCourses.filter((c) => c.category === params.category)
    : sampleCourses;

  // Get current category name
  const currentCategory = categories.find((c) => c.slug === params.category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {currentCategory ? currentCategory.name : "Explore Our Courses"}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {currentCategory
            ? `Discover our top ${currentCategory.name.toLowerCase()} courses designed by industry experts.`
            : "Discover comprehensive training programs designed to advance your career."}
        </p>
      </div>

      {/* Category Filter */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/courses">
          <Badge
            variant={!params.category ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground"
          >
            All Courses
          </Badge>
        </Link>
        {categories.map((category) => (
          <Link key={category.slug} href={`/courses?category=${category.slug}`}>
            <Badge
              variant={params.category === category.slug ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground"
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </Badge>
          </Link>
        ))}
      </div>

      {/* Course Count */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        Showing {filteredSampleCourses.length} courses
        {currentCategory && ` in ${currentCategory.name}`}
      </div>

      {/* Course Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSampleCourses.map((course) => (
          <Card key={course.id} className="group flex flex-col overflow-hidden transition-all hover:shadow-lg">
            {/* Thumbnail */}
            <div className="relative h-48 bg-gradient-to-br from-primary/20 to-purple-600/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <GraduationCap className="h-16 w-16 text-primary/40" />
              </div>
              <Badge className="absolute left-3 top-3" variant="secondary">
                {course.categoryName}
              </Badge>
              <Badge className={`absolute right-3 top-3 ${levelColors[course.level]}`}>
                {course.level}
              </Badge>
            </div>

            <CardHeader className="pb-2">
              <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary">
                {course.title}
              </h3>
            </CardHeader>

            <CardContent className="flex-1">
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {course.description}
              </p>

              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {course.instructor}
              </div>

              <div className="mt-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground">
                    ({course.students.toLocaleString()})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t pt-4">
              <div className="flex w-full items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  ${course.price}
                </span>
                <Button size="sm" className="group-hover:bg-primary">
                  Enroll Now
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredSampleCourses.length === 0 && (
        <div className="mt-16 text-center">
          <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No courses found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {params.category
              ? "No courses in this category yet. Check back soon!"
              : "Courses will be available soon."}
          </p>
          {params.category && (
            <Button asChild className="mt-4">
              <Link href="/courses">View All Courses</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
