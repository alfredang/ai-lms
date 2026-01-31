import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  BarChart3,
  Star,
  User,
  GraduationCap,
  Users,
  CheckCircle,
  PlayCircle,
  FileText,
  Award,
  ArrowLeft,
  Monitor,
  Video,
  Building,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { EnrollButton } from "@/components/courses/enroll-button";

// Force dynamic rendering
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

  // Calculate totals
  const totalStudents = course.classes.reduce(
    (acc, cls) => acc + cls._count.enrollments,
    0
  );
  const activeClass = course.classes[0]; // Get the first active class
  const totalLessons = activeClass?.lessons.length || 0;
  const totalDuration = activeClass?.lessons.reduce((acc, l) => acc + l.duration, 0) || course.duration;

  // Get delivery format info
  const deliveryInfo = deliveryFormatLabels[course.deliveryFormat] || deliveryFormatLabels.E_LEARNING;
  const sessionInfo = sessionTypeLabels[course.sessionType] || sessionTypeLabels.VIRTUAL;
  const DeliveryIcon = deliveryInfo.icon;
  const SessionIcon = sessionInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/courses"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{course.category.name}</Badge>
                <Badge className={levelColors[course.difficulty]}>
                  {course.difficulty.charAt(0) + course.difficulty.slice(1).toLowerCase()}
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

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {course.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{course.createdBy.name || "Unknown Instructor"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">4.8</span>
                  <span className="text-muted-foreground">({totalStudents} students)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8 overflow-hidden">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20">
                  {course.thumbnail ? (
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GraduationCap className="h-16 w-16 text-primary/40" />
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="text-3xl font-bold mb-4">
                    {course.price && Number(course.price) > 0
                      ? `$${Number(course.price)}`
                      : "Free"}
                  </div>

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

                  <Separator className="my-6" />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <PlayCircle className="h-5 w-5 text-muted-foreground" />
                      <span>{totalLessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span>{Math.floor(totalDuration / 60)} hours of content</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span>Downloadable resources</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-muted-foreground" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <DeliveryIcon className="h-5 w-5 text-muted-foreground" />
                      <span>{deliveryInfo.label} Training</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <SessionIcon className="h-5 w-5 text-muted-foreground" />
                      <span>{sessionInfo.label} Sessions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle>What You&apos;ll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Master core concepts and fundamentals",
                    "Build real-world projects and applications",
                    "Learn industry best practices",
                    "Develop problem-solving skills",
                    "Get hands-on practical experience",
                    "Earn a certificate of completion",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Curriculum */}
            {activeClass && activeClass.lessons.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {totalLessons} lessons • {Math.floor(totalDuration / 60)}h {totalDuration % 60}m total
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {activeClass.lessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                            {index + 1}
                          </div>
                          <span className="font-medium">{lesson.title}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {lesson.duration} min
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Instructor */}
            <Card>
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                    {course.createdBy.image ? (
                      <Image
                        src={course.createdBy.image}
                        alt={course.createdBy.name || "Instructor"}
                        width={64}
                        height={64}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-8 w-8 text-primary/60" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {course.createdBy.name || "Unknown Instructor"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Expert Instructor
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Experienced professional with years of teaching and industry experience.
                      Passionate about helping students achieve their learning goals.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Tags */}
            {course.tags && course.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Topics Covered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Courses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedCourses.map((related) => (
                    <Link
                      key={related.id}
                      href={`/courses/${related.slug}`}
                      className="flex items-center gap-3 rounded-lg border p-3 hover:bg-accent transition-colors"
                    >
                      <div className="relative h-12 w-16 rounded bg-muted shrink-0">
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
                        <h4 className="font-medium text-sm line-clamp-2">
                          {related.title}
                        </h4>
                        <p className="text-sm text-primary font-medium">
                          {related.price && Number(related.price) > 0
                            ? `$${Number(related.price)}`
                            : "Free"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
