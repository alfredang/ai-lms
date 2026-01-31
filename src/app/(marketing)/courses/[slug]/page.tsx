import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Star,
  User,
  GraduationCap,
  Users,
  PlayCircle,
  FileText,
  Award,
  ArrowLeft,
  Monitor,
  Video,
  Building,
  Share2,
  Heart,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { EnrollButton } from "@/components/courses/enroll-button";
import { CourseTabs } from "@/components/courses/course-tabs";

export const dynamic = "force-dynamic";

const levelColors: Record<string, string> = {
  BEGINNER: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  INTERMEDIATE: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  ADVANCED: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  EXPERT: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const deliveryFormatLabels: Record<string, { label: string; icon: typeof Monitor }> = {
  INSTRUCTOR_LED: { label: "Instructor-Led", icon: Users },
  E_LEARNING: { label: "E-Learning", icon: Monitor },
};

const sessionTypeLabels: Record<string, { label: string; icon: typeof Video }> = {
  CLASSROOM: { label: "Classroom", icon: Building },
  VIRTUAL: { label: "Virtual", icon: Video },
};

async function getCourse(slug: string) {
  const course = await prisma.course.findUnique({
    where: { slug, isPublished: true },
    include: {
      category: true,
      createdBy: {
        select: { id: true, name: true, image: true },
      },
      classes: {
        where: { isActive: true },
        include: {
          trainer: {
            select: { name: true, image: true },
          },
          lessons: {
            where: { isPublished: true },
            orderBy: { order: "asc" },
            select: {
              id: true,
              title: true,
              duration: true,
            },
          },
          _count: {
            select: { enrollments: true },
          },
        },
      },
    },
  });

  return course;
}

async function getRelatedCourses(categoryId: string, currentSlug: string) {
  return await prisma.course.findMany({
    where: {
      categoryId,
      slug: { not: currentSlug },
      isPublished: true,
    },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      difficulty: true,
      price: true,
    },
  });
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  const session = await auth();
  const relatedCourses = await getRelatedCourses(course.categoryId, slug);

  const totalStudents = course.classes.reduce(
    (acc, cls) => acc + cls._count.enrollments,
    0
  );
  const activeClass = course.classes[0];
  const totalLessons = activeClass?.lessons.length || 0;
  const totalDuration =
    activeClass?.lessons.reduce((acc, l) => acc + l.duration, 0) || course.duration;

  const deliveryInfo =
    deliveryFormatLabels[course.deliveryFormat] || deliveryFormatLabels.E_LEARNING;
  const sessionInfo =
    sessionTypeLabels[course.sessionType] || sessionTypeLabels.VIRTUAL;
  const DeliveryIcon = deliveryInfo.icon;
  const SessionIcon = sessionInfo.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-muted/80 to-background border-b">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/courses"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>

          {/* Hero Content: Thumbnail Left, Info Right */}
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            {/* Left: Course Thumbnail */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-purple-600/20 shadow-lg">
              {course.thumbnail ? (
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <GraduationCap className="h-24 w-24 text-primary/40" />
                </div>
              )}
              {/* Play overlay for video preview */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center">
                  <PlayCircle className="h-10 w-10 text-primary" />
                </div>
              </div>
            </div>

            {/* Right: Course Info */}
            <div className="space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="font-medium">
                  {course.category.name}
                </Badge>
                <Badge className={levelColors[course.difficulty]}>
                  {course.difficulty.charAt(0) +
                    course.difficulty.slice(1).toLowerCase()}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <DeliveryIcon className="h-3 w-3" />
                  {deliveryInfo.label}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <SessionIcon className="h-3 w-3" />
                  {sessionInfo.label}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-4xl">
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-muted-foreground text-lg leading-relaxed line-clamp-3">
                {course.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {course.createdBy.name || "Expert Instructor"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-muted-foreground">
                    ({totalStudents > 0 ? totalStudents : "127"} students)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <PlayCircle className="h-4 w-4 text-muted-foreground" />
                  <span>{totalLessons > 0 ? totalLessons : 20} lessons</span>
                </div>
              </div>

              {/* Action Buttons (Mobile/Tablet) */}
              <div className="flex gap-3 lg:hidden pt-2">
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: Tabbed Content (2 columns) */}
          <div className="lg:col-span-2">
            <CourseTabs
              description={course.description}
              lessons={activeClass?.lessons || []}
              totalLessons={totalLessons}
              totalDuration={totalDuration}
              difficulty={
                course.difficulty.charAt(0) +
                course.difficulty.slice(1).toLowerCase()
              }
              deliveryLabel={deliveryInfo.label}
              sessionLabel={sessionInfo.label}
              tags={course.tags || []}
              instructor={{
                name: course.createdBy.name,
                image: course.createdBy.image,
              }}
            />
          </div>

          {/* Right: Sticky Pricing Sidebar (1 column) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Pricing Card */}
              <Card className="shadow-lg border-2">
                <CardContent className="p-6">
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold">
                      {course.price && Number(course.price) > 0
                        ? `$${Number(course.price)}`
                        : "Free"}
                    </span>
                    {course.price && Number(course.price) > 0 && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${Math.round(Number(course.price) * 1.3)}
                      </span>
                    )}
                  </div>

                  {/* Enroll Button */}
                  {activeClass ? (
                    <EnrollButton
                      courseId={course.id}
                      classId={activeClass.id}
                      courseSlug={course.slug}
                      isLoggedIn={!!session?.user}
                      price={course.price ? Number(course.price) : 0}
                    />
                  ) : (
                    <Button className="w-full" size="lg" disabled>
                      Coming Soon
                    </Button>
                  )}

                  {/* Secondary Actions */}
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" className="flex-1" size="sm">
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Button>
                    <Button variant="outline" className="flex-1" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  {/* Course Includes */}
                  <h4 className="font-semibold mb-4">This course includes:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <PlayCircle className="h-5 w-5 text-primary" />
                      <span>
                        {Math.floor(totalDuration / 60)} hours of video content
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>{totalLessons > 0 ? totalLessons : 20} lessons</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>Downloadable resources</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-primary" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <DeliveryIcon className="h-5 w-5 text-primary" />
                      <span>{deliveryInfo.label} Training</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <SessionIcon className="h-5 w-5 text-primary" />
                      <span>{sessionInfo.label} Sessions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>Lifetime access</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Courses */}
              {relatedCourses.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">Related Courses</h4>
                    <div className="space-y-4">
                      {relatedCourses.map((related) => (
                        <Link
                          key={related.id}
                          href={`/courses/${related.slug}`}
                          className="flex items-center gap-3 rounded-lg border p-3 hover:bg-accent transition-colors"
                        >
                          <div className="relative h-12 w-16 rounded bg-muted shrink-0 overflow-hidden">
                            {related.thumbnail ? (
                              <Image
                                src={related.thumbnail}
                                alt={related.title}
                                fill
                                className="rounded object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center">
                                <GraduationCap className="h-6 w-6 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-sm line-clamp-2">
                              {related.title}
                            </h5>
                            <p className="text-sm text-primary font-medium">
                              {related.price && Number(related.price) > 0
                                ? `$${Number(related.price)}`
                                : "Free"}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
