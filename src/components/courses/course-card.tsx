import Link from "next/link";
import Image from "next/image";
import { Clock, Users, BarChart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils";
import type { DifficultyLevel } from "@prisma/client";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail: string | null;
    duration: number;
    difficulty: DifficultyLevel;
    category: {
      name: string;
      slug: string;
    };
    _count?: {
      classes: number;
    };
  };
}

const difficultyColors: Record<DifficultyLevel, string> = {
  BEGINNER: "bg-green-500/10 text-green-600 border-green-500/20",
  INTERMEDIATE: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  ADVANCED: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  EXPERT: "bg-red-500/10 text-red-600 border-red-500/20",
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {course.thumbnail ? (
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <span className="text-4xl font-bold text-primary/40">
                {course.title.charAt(0)}
              </span>
            </div>
          )}
          {/* Category badge */}
          <div className="absolute left-3 top-3">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur">
              {course.category.name}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Title */}
          <h3 className="line-clamp-2 font-semibold group-hover:text-primary">
            {course.title}
          </h3>

          {/* Description */}
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {course.description}
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t px-4 py-3">
          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {formatDuration(course.duration)}
            </div>
            {course._count && (
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {course._count.classes}
              </div>
            )}
          </div>

          {/* Difficulty */}
          <Badge
            variant="outline"
            className={difficultyColors[course.difficulty]}
          >
            {course.difficulty.charAt(0) + course.difficulty.slice(1).toLowerCase()}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
