import type { RoleName, DifficultyLevel, EnrollmentStatus, SubmissionStatus, MaterialType, BadgeRarity } from "@prisma/client";

// Re-export Prisma enums
export type { RoleName, DifficultyLevel, EnrollmentStatus, SubmissionStatus, MaterialType, BadgeRarity };

// Session user type
export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: RoleName;
}

// Extended NextAuth types
declare module "next-auth" {
  interface Session {
    user: SessionUser;
  }
  interface User {
    role: RoleName;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: RoleName;
  }
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Course types
export interface CourseWithCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  duration: number;
  difficulty: DifficultyLevel;
  isPublished: boolean;
  isFeatured: boolean;
  price: number | null;
  tags: string[];
  category: {
    id: string;
    name: string;
    slug: string;
  };
  createdBy: {
    id: string;
    name: string | null;
    image: string | null;
  };
  _count: {
    classes: number;
  };
}

// Enrollment with progress
export interface EnrollmentWithProgress {
  id: string;
  status: EnrollmentStatus;
  progress: number;
  enrolledAt: Date;
  completedAt: Date | null;
  class: {
    id: string;
    name: string;
    course: {
      id: string;
      title: string;
      slug: string;
      thumbnail: string | null;
    };
    trainer: {
      id: string;
      name: string | null;
      image: string | null;
    };
  };
}

// Gamification
export interface GamificationStats {
  totalXp: number;
  level: number;
  levelTitle: string;
  currentStreak: number;
  longestStreak: number;
  xpToNextLevel: number;
  progressToNextLevel: number;
  badges: {
    id: string;
    name: string;
    icon: string;
    rarity: BadgeRarity;
    earnedAt: Date;
  }[];
  recentActivity: {
    id: string;
    amount: number;
    reason: string;
    createdAt: Date;
  }[];
}

// AI Chat
export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: Date;
}

export interface ChatContext {
  courseId?: string;
  lessonId?: string;
  courseName?: string;
  lessonTitle?: string;
}

// Notification
export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  link: string | null;
  createdAt: Date;
}

// XP Action types
export type XPAction =
  | "LESSON_COMPLETE"
  | "ASSIGNMENT_SUBMIT"
  | "ASSIGNMENT_PASS"
  | "ASSIGNMENT_PERFECT"
  | "DAILY_LOGIN"
  | "STREAK_7_DAY"
  | "STREAK_30_DAY"
  | "FIRST_DISCUSSION"
  | "HELP_LEARNER";

export const XP_REWARDS: Record<XPAction, number> = {
  LESSON_COMPLETE: 50,
  ASSIGNMENT_SUBMIT: 25,
  ASSIGNMENT_PASS: 100,
  ASSIGNMENT_PERFECT: 200,
  DAILY_LOGIN: 10,
  STREAK_7_DAY: 100,
  STREAK_30_DAY: 500,
  FIRST_DISCUSSION: 15,
  HELP_LEARNER: 20,
};
