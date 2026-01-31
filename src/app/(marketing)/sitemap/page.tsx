import { Map, Home, BookOpen, Users, HelpCircle, FileText, Building } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

async function getCourses() {
  return await prisma.course.findMany({
    where: { isPublished: true },
    select: {
      title: true,
      slug: true,
      category: {
        select: { name: true },
      },
    },
    orderBy: { title: "asc" },
  });
}

export default async function SitemapPage() {
  const [categories, courses] = await Promise.all([
    getCategories(),
    getCourses(),
  ]);

  // Group courses by category
  const coursesByCategory = courses.reduce((acc, course) => {
    const categoryName = course.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(course);
    return acc;
  }, {} as Record<string, typeof courses>);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Map className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Sitemap</h1>
          <p className="mt-4 text-muted-foreground">
            Find your way around LearnHub
          </p>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Main Pages */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Home className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Main Pages</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-primary hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-primary hover:underline">
                    Browse Courses
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-primary hover:underline">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-primary hover:underline">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* User Portals */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">User Portals</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/login" className="hover:text-primary hover:underline">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-primary hover:underline">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/learner" className="hover:text-primary hover:underline">
                    Learner Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/trainer" className="hover:text-primary hover:underline">
                    Trainer Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-primary hover:underline">
                    Admin Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Support & Help</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-primary hover:underline">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="hover:text-primary hover:underline">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-primary hover:underline">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-primary hover:underline">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Legal</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-primary hover:underline">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="hover:text-primary hover:underline">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link href="/accessibility" className="hover:text-primary hover:underline">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-16">
            <div className="flex items-center gap-2 mb-6">
              <Building className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Course Categories</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/courses?category=${category.slug}`}
                  className="rounded-lg border p-4 hover:border-primary hover:bg-accent transition-colors"
                >
                  <h3 className="font-medium">{category.name}</h3>
                  {category.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* All Courses */}
          <div className="mt-16">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">All Courses</h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              {Object.entries(coursesByCategory).map(([categoryName, categoryCourses]) => (
                <div key={categoryName}>
                  <h3 className="font-medium text-primary mb-3">{categoryName}</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {categoryCourses.map((course) => (
                      <li key={course.slug}>
                        <Link
                          href={`/courses/${course.slug}`}
                          className="hover:text-primary hover:underline"
                        >
                          {course.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
