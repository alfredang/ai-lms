import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Create roles
  console.log("Creating roles...");
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: "LEARNER" },
      update: {},
      create: { name: "LEARNER", description: "Regular learner with access to courses" },
    }),
    prisma.role.upsert({
      where: { name: "TRAINER" },
      update: {},
      create: { name: "TRAINER", description: "Course instructor with teaching capabilities" },
    }),
    prisma.role.upsert({
      where: { name: "ADMIN" },
      update: {},
      create: { name: "ADMIN", description: "Platform administrator" },
    }),
    prisma.role.upsert({
      where: { name: "SUPERADMIN" },
      update: {},
      create: { name: "SUPERADMIN", description: "Super administrator with full access" },
    }),
  ]);

  const [learnerRole, trainerRole, adminRole, superadminRole] = roles;

  // Create default superadmin user
  console.log("Creating default users...");
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const superadmin = await prisma.user.upsert({
    where: { email: "admin@learnhub.com" },
    update: {},
    create: {
      email: "admin@learnhub.com",
      name: "Super Admin",
      password: hashedPassword,
      roleId: superadminRole.id,
      gamificationProfile: {
        create: {
          totalXp: 0,
          level: 1,
        },
      },
    },
  });

  // Create demo trainer
  const trainer = await prisma.user.upsert({
    where: { email: "trainer@learnhub.com" },
    update: {},
    create: {
      email: "trainer@learnhub.com",
      name: "Demo Trainer",
      password: hashedPassword,
      roleId: trainerRole.id,
      gamificationProfile: {
        create: {
          totalXp: 5000,
          level: 5,
        },
      },
    },
  });

  // Create demo learner
  const learner = await prisma.user.upsert({
    where: { email: "learner@learnhub.com" },
    update: {},
    create: {
      email: "learner@learnhub.com",
      name: "Demo Learner",
      password: hashedPassword,
      roleId: learnerRole.id,
      gamificationProfile: {
        create: {
          totalXp: 1250,
          level: 3,
          currentStreak: 5,
          longestStreak: 12,
        },
      },
    },
  });

  // Create categories
  console.log("Creating categories...");
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "web-development" },
      update: {},
      create: {
        name: "Web Development",
        slug: "web-development",
        description: "Learn modern web development technologies",
        icon: "globe",
      },
    }),
    prisma.category.upsert({
      where: { slug: "data-science" },
      update: {},
      create: {
        name: "Data Science",
        slug: "data-science",
        description: "Master data analysis and machine learning",
        icon: "bar-chart",
      },
    }),
    prisma.category.upsert({
      where: { slug: "mobile-development" },
      update: {},
      create: {
        name: "Mobile Development",
        slug: "mobile-development",
        description: "Build iOS and Android applications",
        icon: "smartphone",
      },
    }),
    prisma.category.upsert({
      where: { slug: "cloud-computing" },
      update: {},
      create: {
        name: "Cloud Computing",
        slug: "cloud-computing",
        description: "Deploy and manage cloud infrastructure",
        icon: "cloud",
      },
    }),
    prisma.category.upsert({
      where: { slug: "devops" },
      update: {},
      create: {
        name: "DevOps",
        slug: "devops",
        description: "Learn CI/CD and infrastructure automation",
        icon: "git-branch",
      },
    }),
    prisma.category.upsert({
      where: { slug: "ai-ml" },
      update: {},
      create: {
        name: "AI & Machine Learning",
        slug: "ai-ml",
        description: "Explore artificial intelligence and ML",
        icon: "brain",
      },
    }),
  ]);

  // Create badges
  console.log("Creating badges...");
  const badgeDefinitions = [
    {
      name: "First Steps",
      description: "Complete your first lesson",
      icon: "footprints",
      criteria: { type: "lessons_completed", value: 1 },
      xpReward: 50,
      rarity: "COMMON" as const,
      category: "completion",
    },
    {
      name: "Quick Learner",
      description: "Complete 10 lessons",
      icon: "rocket",
      criteria: { type: "lessons_completed", value: 10 },
      xpReward: 100,
      rarity: "COMMON" as const,
      category: "completion",
    },
    {
      name: "Consistent",
      description: "Maintain a 7-day learning streak",
      icon: "flame",
      criteria: { type: "streak", value: 7 },
      xpReward: 100,
      rarity: "COMMON" as const,
      category: "dedication",
    },
    {
      name: "Dedicated",
      description: "Maintain a 30-day learning streak",
      icon: "fire",
      criteria: { type: "streak", value: 30 },
      xpReward: 500,
      rarity: "RARE" as const,
      category: "dedication",
    },
    {
      name: "Perfectionist",
      description: "Get a perfect score on an assignment",
      icon: "star",
      criteria: { type: "action", value: "ASSIGNMENT_PERFECT" },
      xpReward: 100,
      rarity: "UNCOMMON" as const,
      category: "excellence",
    },
    {
      name: "XP Hunter",
      description: "Earn 1,000 XP",
      icon: "target",
      criteria: { type: "xp_total", value: 1000 },
      xpReward: 50,
      rarity: "COMMON" as const,
      category: "special",
    },
    {
      name: "Rising Star",
      description: "Reach level 5",
      icon: "trending-up",
      criteria: { type: "level", value: 5 },
      xpReward: 200,
      rarity: "UNCOMMON" as const,
      category: "special",
    },
  ];

  for (const badge of badgeDefinitions) {
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: {},
      create: badge,
    });
  }

  // Create sample course
  console.log("Creating sample course...");
  const course = await prisma.course.upsert({
    where: { slug: "nextjs-fundamentals" },
    update: {},
    create: {
      title: "Next.js Fundamentals",
      slug: "nextjs-fundamentals",
      description:
        "Master the fundamentals of Next.js, the React framework for production. Learn server-side rendering, static site generation, API routes, and more.",
      duration: 480, // 8 hours
      difficulty: "BEGINNER",
      isPublished: true,
      isFeatured: true,
      tags: ["nextjs", "react", "typescript", "web development"],
      categoryId: categories[0].id, // Web Development
      createdById: trainer.id,
    },
  });

  // Create class for the course
  const classInstance = await prisma.class.upsert({
    where: {
      id: "demo-class-nextjs",
    },
    update: {},
    create: {
      id: "demo-class-nextjs",
      name: "January 2026 Cohort",
      description: "Self-paced learning cohort",
      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-03-31"),
      maxStudents: 100,
      isActive: true,
      courseId: course.id,
      trainerId: trainer.id,
    },
  });

  // Create lessons
  console.log("Creating lessons...");
  const lessons = await Promise.all([
    prisma.lesson.upsert({
      where: {
        classId_order: {
          classId: classInstance.id,
          order: 1,
        },
      },
      update: {},
      create: {
        title: "Introduction to Next.js",
        description: "Learn what Next.js is and why it's the go-to framework for React applications.",
        order: 1,
        duration: 30,
        isPublished: true,
        classId: classInstance.id,
      },
    }),
    prisma.lesson.upsert({
      where: {
        classId_order: {
          classId: classInstance.id,
          order: 2,
        },
      },
      update: {},
      create: {
        title: "Project Setup",
        description: "Set up your development environment and create your first Next.js project.",
        order: 2,
        duration: 45,
        isPublished: true,
        classId: classInstance.id,
      },
    }),
    prisma.lesson.upsert({
      where: {
        classId_order: {
          classId: classInstance.id,
          order: 3,
        },
      },
      update: {},
      create: {
        title: "File-based Routing",
        description: "Understand how Next.js handles routing through the file system.",
        order: 3,
        duration: 60,
        isPublished: true,
        classId: classInstance.id,
      },
    }),
  ]);

  // Enroll demo learner in the course
  console.log("Creating enrollment...");
  await prisma.enrollment.upsert({
    where: {
      userId_classId: {
        userId: learner.id,
        classId: classInstance.id,
      },
    },
    update: {},
    create: {
      userId: learner.id,
      classId: classInstance.id,
      status: "ACTIVE",
      progress: 33.3,
    },
  });

  // Create lesson progress for demo learner
  await prisma.lessonProgress.upsert({
    where: {
      lessonId_enrollmentId: {
        lessonId: lessons[0].id,
        enrollmentId: (
          await prisma.enrollment.findUnique({
            where: {
              userId_classId: {
                userId: learner.id,
                classId: classInstance.id,
              },
            },
          })
        )!.id,
      },
    },
    update: {},
    create: {
      lessonId: lessons[0].id,
      enrollmentId: (
        await prisma.enrollment.findUnique({
          where: {
            userId_classId: {
              userId: learner.id,
              classId: classInstance.id,
            },
          },
        })
      )!.id,
      isCompleted: true,
      completedAt: new Date(),
      timeSpent: 1800, // 30 minutes in seconds
    },
  });

  console.log("Database seeded successfully!");
  console.log("\nDemo accounts:");
  console.log("- Superadmin: admin@learnhub.com / admin123");
  console.log("- Trainer: trainer@learnhub.com / admin123");
  console.log("- Learner: learner@learnhub.com / admin123");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
