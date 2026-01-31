"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  FileText,
  BookOpen,
  Target,
  Users,
  Award,
  Briefcase,
  GraduationCap,
  Star,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";

interface Lesson {
  id: string;
  title: string;
  duration: number;
}

interface CourseTabsProps {
  description: string;
  lessons: Lesson[];
  totalLessons: number;
  totalDuration: number;
  difficulty: string;
  deliveryLabel: string;
  sessionLabel: string;
  tags: string[];
  instructor: {
    name: string | null;
    image: string | null;
  };
}

export function CourseTabs({
  description,
  lessons,
  totalLessons,
  totalDuration,
  difficulty,
  deliveryLabel,
  sessionLabel,
  tags,
  instructor,
}: CourseTabsProps) {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    module1: true,
  });

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // Group lessons into modules (every 4-5 lessons)
  const modules = [];
  const lessonsPerModule = 4;
  for (let i = 0; i < lessons.length; i += lessonsPerModule) {
    modules.push({
      id: `module${Math.floor(i / lessonsPerModule) + 1}`,
      title: `Module ${Math.floor(i / lessonsPerModule) + 1}`,
      lessons: lessons.slice(i, i + lessonsPerModule),
    });
  }

  // If no lessons, create sample modules
  const displayModules =
    modules.length > 0
      ? modules
      : [
          {
            id: "module1",
            title: "Module 1: Getting Started",
            lessons: [
              { id: "1", title: "Introduction to the Course", duration: 15 },
              { id: "2", title: "Setting Up Your Environment", duration: 20 },
              { id: "3", title: "Core Concepts Overview", duration: 25 },
            ],
          },
          {
            id: "module2",
            title: "Module 2: Fundamentals",
            lessons: [
              { id: "4", title: "Building Your First Project", duration: 30 },
              { id: "5", title: "Best Practices and Patterns", duration: 25 },
              { id: "6", title: "Hands-on Exercises", duration: 35 },
            ],
          },
          {
            id: "module3",
            title: "Module 3: Advanced Topics",
            lessons: [
              { id: "7", title: "Advanced Techniques", duration: 40 },
              { id: "8", title: "Real-world Applications", duration: 35 },
              { id: "9", title: "Final Project", duration: 45 },
            ],
          },
        ];

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full justify-start bg-muted/50 p-1 h-auto flex-wrap">
        <TabsTrigger value="overview" className="px-6 py-2.5">
          Overview
        </TabsTrigger>
        <TabsTrigger value="curriculum" className="px-6 py-2.5">
          Curriculum
        </TabsTrigger>
        <TabsTrigger value="instructor" className="px-6 py-2.5">
          Instructor
        </TabsTrigger>
        <TabsTrigger value="reviews" className="px-6 py-2.5">
          Reviews
        </TabsTrigger>
      </TabsList>

      {/* Overview Tab */}
      <TabsContent value="overview" className="mt-6 space-y-6">
        {/* Key Highlights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Key Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold">
                    {Math.floor(totalDuration / 60)}+ Hours
                  </p>
                  <p className="text-sm text-muted-foreground">of content</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <BookOpen className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold">{totalLessons || 20}+ Lessons</p>
                  <p className="text-sm text-muted-foreground">comprehensive</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Award className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold">{difficulty}</p>
                  <p className="text-sm text-muted-foreground">level course</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <GraduationCap className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold">Certificate</p>
                  <p className="text-sm text-muted-foreground">on completion</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              About This Course
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </CardContent>
        </Card>

        {/* What You'll Learn */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              What You&apos;ll Learn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Master core concepts and fundamentals",
                "Build real-world projects from scratch",
                "Learn industry best practices and patterns",
                "Develop problem-solving skills",
                "Get hands-on practical experience",
                "Work with modern tools and technologies",
                "Understand architecture and design principles",
                "Prepare for professional certification",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prerequisites */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Prerequisites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <span className="text-sm text-muted-foreground">
                  Basic understanding of the subject area
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <span className="text-sm text-muted-foreground">
                  Computer with internet access
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <span className="text-sm text-muted-foreground">
                  Willingness to learn and practice
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Who This Course Is For */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Who This Course Is For
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Beginners looking to start their journey",
                "Professionals seeking to upskill",
                "Students preparing for certifications",
                "Anyone interested in this field",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Topics Covered */}
        {tags && tags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Topics Covered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      {/* Curriculum Tab */}
      <TabsContent value="curriculum" className="mt-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Course Content</h3>
            <p className="text-sm text-muted-foreground">
              {displayModules.length} modules •{" "}
              {displayModules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons •{" "}
              {Math.floor(totalDuration / 60)}h {totalDuration % 60}m total
            </p>
          </div>
          <button
            onClick={() => {
              const allExpanded = Object.values(expandedModules).every((v) => v);
              const newState: Record<string, boolean> = {};
              displayModules.forEach((m) => (newState[m.id] = !allExpanded));
              setExpandedModules(newState);
            }}
            className="text-sm text-primary hover:underline"
          >
            {Object.values(expandedModules).every((v) => v)
              ? "Collapse all"
              : "Expand all"}
          </button>
        </div>

        {displayModules.map((module, moduleIndex) => {
          const moduleDuration = module.lessons.reduce((acc, l) => acc + l.duration, 0);
          const isExpanded = expandedModules[module.id];

          return (
            <Card key={module.id} className="overflow-hidden">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                    {moduleIndex + 1}
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold">{module.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {module.lessons.length} lessons • {moduleDuration} min
                    </p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>

              {isExpanded && (
                <div className="border-t">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between px-6 py-3 border-b last:border-b-0 hover:bg-muted/30"
                    >
                      <div className="flex items-center gap-3">
                        <PlayCircle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {moduleIndex * 4 + lessonIndex + 1}. {lesson.title}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {lesson.duration} min
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </TabsContent>

      {/* Instructor Tab */}
      <TabsContent value="instructor" className="mt-6 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Instructor Photo */}
              <div className="flex flex-col items-center sm:items-start">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center overflow-hidden">
                  {instructor.image ? (
                    <Image
                      src={instructor.image}
                      alt={instructor.name || "Instructor"}
                      width={128}
                      height={128}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-primary">
                      {instructor.name?.charAt(0) || "T"}
                    </span>
                  )}
                </div>
              </div>

              {/* Instructor Info */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-1">
                  {instructor.name || "Expert Instructor"}
                </h3>
                <p className="text-primary font-medium mb-4">
                  Senior {deliveryLabel} Trainer
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.8</span>
                    <span className="text-muted-foreground">Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className="font-semibold">2,500+</span>
                    <span className="text-muted-foreground">Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <span className="font-semibold">12</span>
                    <span className="text-muted-foreground">Courses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <span className="font-semibold">850+</span>
                    <span className="text-muted-foreground">Reviews</span>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    A seasoned professional with over 10 years of industry experience.
                    Passionate about teaching and helping students achieve their learning
                    goals through practical, hands-on training.
                  </p>
                  <p>
                    Previously worked at leading tech companies and has trained thousands
                    of students worldwide. Specializes in breaking down complex concepts
                    into easy-to-understand lessons.
                  </p>
                </div>

                {/* Expertise */}
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Course Design",
                      "Technical Training",
                      "Mentorship",
                      "Project-Based Learning",
                      sessionLabel,
                    ].map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Reviews Tab */}
      <TabsContent value="reviews" className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Rating Summary */}
            <div className="flex flex-col sm:flex-row gap-8 mb-8 pb-8 border-b">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary">4.8</div>
                <div className="flex items-center justify-center gap-1 my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= 4
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-yellow-400/50 text-yellow-400/50"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Based on 127 reviews</p>
              </div>

              <div className="flex-1 space-y-2">
                {[
                  { stars: 5, percentage: 75 },
                  { stars: 4, percentage: 18 },
                  { stars: 3, percentage: 5 },
                  { stars: 2, percentage: 1 },
                  { stars: 1, percentage: 1 },
                ].map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-3">
                    <span className="text-sm w-12">{rating.stars} stars</span>
                    <Progress value={rating.percentage} className="h-2 flex-1" />
                    <span className="text-sm text-muted-foreground w-10">
                      {rating.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Reviews */}
            <div className="space-y-6">
              {[
                {
                  name: "Sarah M.",
                  rating: 5,
                  date: "2 weeks ago",
                  comment:
                    "Excellent course! The instructor explains everything clearly and the hands-on projects really helped solidify my understanding.",
                },
                {
                  name: "James K.",
                  rating: 5,
                  date: "1 month ago",
                  comment:
                    "Very comprehensive and well-structured. I went from knowing nothing to feeling confident in just a few weeks.",
                },
                {
                  name: "Emily R.",
                  rating: 4,
                  date: "1 month ago",
                  comment:
                    "Great content and delivery. Would love to see more advanced topics covered in a follow-up course.",
                },
              ].map((review, i) => (
                <div key={i} className="border-b pb-6 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
