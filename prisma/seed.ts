import { config } from "dotenv";
config(); // Load .env file

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

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

  // Create demo trainers
  const trainers = await Promise.all([
    prisma.user.upsert({
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
    }),
    prisma.user.upsert({
      where: { email: "sarah.chen@learnhub.com" },
      update: {},
      create: {
        email: "sarah.chen@learnhub.com",
        name: "Dr. Sarah Chen",
        password: hashedPassword,
        roleId: trainerRole.id,
        gamificationProfile: { create: { totalXp: 8000, level: 7 } },
      },
    }),
    prisma.user.upsert({
      where: { email: "alex.rodriguez@learnhub.com" },
      update: {},
      create: {
        email: "alex.rodriguez@learnhub.com",
        name: "Alex Rodriguez",
        password: hashedPassword,
        roleId: trainerRole.id,
        gamificationProfile: { create: { totalXp: 6500, level: 6 } },
      },
    }),
    prisma.user.upsert({
      where: { email: "emma.wilson@learnhub.com" },
      update: {},
      create: {
        email: "emma.wilson@learnhub.com",
        name: "Emma Wilson",
        password: hashedPassword,
        roleId: trainerRole.id,
        gamificationProfile: { create: { totalXp: 7200, level: 6 } },
      },
    }),
    prisma.user.upsert({
      where: { email: "david.chen@learnhub.com" },
      update: {},
      create: {
        email: "david.chen@learnhub.com",
        name: "David Chen",
        password: hashedPassword,
        roleId: trainerRole.id,
        gamificationProfile: { create: { totalXp: 9000, level: 8 } },
      },
    }),
    prisma.user.upsert({
      where: { email: "jennifer.adams@learnhub.com" },
      update: {},
      create: {
        email: "jennifer.adams@learnhub.com",
        name: "Jennifer Adams",
        password: hashedPassword,
        roleId: trainerRole.id,
        gamificationProfile: { create: { totalXp: 7800, level: 7 } },
      },
    }),
    prisma.user.upsert({
      where: { email: "chris.taylor@learnhub.com" },
      update: {},
      create: {
        email: "chris.taylor@learnhub.com",
        name: "Chris Taylor",
        password: hashedPassword,
        roleId: trainerRole.id,
        gamificationProfile: { create: { totalXp: 8500, level: 7 } },
      },
    }),
  ]);

  const [demoTrainer, sarahChen, alexRodriguez, emmaWilson, davidChen, jenniferAdams, chrisTaylor] = trainers;

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

  // Create NEW categories
  console.log("Creating categories...");
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "gen-ai-agentic-ai" },
      update: { name: "Gen AI & Agentic AI", icon: "🤖" },
      create: {
        name: "Gen AI & Agentic AI",
        slug: "gen-ai-agentic-ai",
        description: "Learn generative AI, LLMs, and building autonomous AI agents",
        icon: "🤖",
      },
    }),
    prisma.category.upsert({
      where: { slug: "vibe-coding" },
      update: { name: "Vibe Coding", icon: "💻" },
      create: {
        name: "Vibe Coding",
        slug: "vibe-coding",
        description: "Modern development with AI-powered coding tools",
        icon: "💻",
      },
    }),
    prisma.category.upsert({
      where: { slug: "investment" },
      update: { name: "Investment", icon: "📈" },
      create: {
        name: "Investment",
        slug: "investment",
        description: "Stock market, crypto, and real estate investment strategies",
        icon: "📈",
      },
    }),
    prisma.category.upsert({
      where: { slug: "soft-skills" },
      update: { name: "Soft Skills", icon: "🎯" },
      create: {
        name: "Soft Skills",
        slug: "soft-skills",
        description: "Leadership, communication, and professional development",
        icon: "🎯",
      },
    }),
    prisma.category.upsert({
      where: { slug: "marketing" },
      update: { name: "Marketing", icon: "📣" },
      create: {
        name: "Marketing",
        slug: "marketing",
        description: "Digital marketing, SEO, and social media strategies",
        icon: "📣",
      },
    }),
  ]);

  const [genAiCategory, vibeCodingCategory, investmentCategory, softSkillsCategory, marketingCategory] = categories;

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

  // Create sample courses
  console.log("Creating sample courses...");

  const courseDefinitions = [
    // Gen AI & Agentic AI (3 courses)
    {
      title: "Building AI Agents with LangChain",
      slug: "building-ai-agents-langchain",
      description: "Learn to build powerful AI agents using LangChain, from basic concepts to advanced autonomous systems. Master chains, tools, and agent architectures.",
      duration: 720, // 12 hours
      difficulty: "INTERMEDIATE" as const,
      price: 99,
      thumbnail: "/courses/ai-agents.svg",
      tags: ["langchain", "ai agents", "llm", "python"],
      categoryId: genAiCategory.id,
      createdById: sarahChen.id,
      isFeatured: true,
    },
    {
      title: "Prompt Engineering Masterclass",
      slug: "prompt-engineering-masterclass",
      description: "Master the art of prompt engineering to get the best results from ChatGPT, Claude, and other LLMs. Learn techniques for all use cases.",
      duration: 480, // 8 hours
      difficulty: "BEGINNER" as const,
      price: 79,
      thumbnail: "/courses/prompt-eng.svg",
      tags: ["prompt engineering", "chatgpt", "claude", "ai"],
      categoryId: genAiCategory.id,
      createdById: alexRodriguez.id,
      isFeatured: true,
    },
    {
      title: "Claude & ChatGPT API Development",
      slug: "claude-chatgpt-api-development",
      description: "Build production-ready applications using the Claude and OpenAI APIs with best practices for error handling, rate limiting, and optimization.",
      duration: 600, // 10 hours
      difficulty: "INTERMEDIATE" as const,
      price: 89,
      thumbnail: "/courses/api-dev.svg",
      tags: ["api", "claude", "openai", "python", "typescript"],
      categoryId: genAiCategory.id,
      createdById: sarahChen.id,
      isFeatured: false,
    },

    // Vibe Coding (3 courses)
    {
      title: "Modern React with AI Tools",
      slug: "modern-react-ai-tools",
      description: "Learn modern React development enhanced with AI coding assistants for 10x productivity. Integrate Copilot, Cursor, and more into your workflow.",
      duration: 900, // 15 hours
      difficulty: "INTERMEDIATE" as const,
      price: 119,
      thumbnail: "/courses/react-ai.svg",
      tags: ["react", "ai tools", "copilot", "cursor"],
      categoryId: vibeCodingCategory.id,
      createdById: emmaWilson.id,
      isFeatured: true,
    },
    {
      title: "Full-Stack Development with Cursor",
      slug: "fullstack-development-cursor",
      description: "Master full-stack development using Cursor AI to build applications faster than ever. From frontend to backend with AI assistance.",
      duration: 1200, // 20 hours
      difficulty: "ADVANCED" as const,
      price: 149,
      thumbnail: "/courses/cursor-dev.svg",
      tags: ["cursor", "fullstack", "ai coding", "typescript"],
      categoryId: vibeCodingCategory.id,
      createdById: emmaWilson.id,
      isFeatured: false,
    },
    {
      title: "Building Apps with Claude Code",
      slug: "building-apps-claude-code",
      description: "Create complete applications from scratch using Claude Code's AI-powered development. Learn prompting strategies for code generation.",
      duration: 600, // 10 hours
      difficulty: "BEGINNER" as const,
      price: 99,
      thumbnail: "/courses/claude-code.svg",
      tags: ["claude code", "ai development", "coding"],
      categoryId: vibeCodingCategory.id,
      createdById: alexRodriguez.id,
      isFeatured: true,
    },

    // Investment (3 courses)
    {
      title: "Stock Market Fundamentals",
      slug: "stock-market-fundamentals",
      description: "Learn the fundamentals of stock market investing, from reading charts to building portfolios. Perfect for beginners starting their investment journey.",
      duration: 480, // 8 hours
      difficulty: "BEGINNER" as const,
      price: 69,
      thumbnail: "/courses/stocks.svg",
      tags: ["stocks", "investing", "portfolio", "trading"],
      categoryId: investmentCategory.id,
      createdById: davidChen.id,
      isFeatured: false,
    },
    {
      title: "Crypto & DeFi Investing",
      slug: "crypto-defi-investing",
      description: "Navigate the world of cryptocurrency and decentralized finance with confidence. Learn about Bitcoin, Ethereum, DeFi protocols, and risk management.",
      duration: 720, // 12 hours
      difficulty: "INTERMEDIATE" as const,
      price: 89,
      thumbnail: "/courses/crypto.svg",
      tags: ["crypto", "defi", "bitcoin", "ethereum"],
      categoryId: investmentCategory.id,
      createdById: davidChen.id,
      isFeatured: true,
    },
    {
      title: "Real Estate Investment Strategies",
      slug: "real-estate-investment-strategies",
      description: "Comprehensive guide to real estate investing, from rental properties to REITs. Learn deal analysis, financing, and portfolio building.",
      duration: 960, // 16 hours
      difficulty: "ADVANCED" as const,
      price: 129,
      thumbnail: "/courses/real-estate.svg",
      tags: ["real estate", "reits", "rental properties", "investing"],
      categoryId: investmentCategory.id,
      createdById: davidChen.id,
      isFeatured: false,
    },

    // Soft Skills (3 courses)
    {
      title: "Leadership & Team Management",
      slug: "leadership-team-management",
      description: "Develop essential leadership skills to inspire and manage high-performing teams. Learn motivation, delegation, and conflict resolution.",
      duration: 360, // 6 hours
      difficulty: "BEGINNER" as const,
      price: 59,
      thumbnail: "/courses/leadership.svg",
      tags: ["leadership", "management", "teamwork", "soft skills"],
      categoryId: softSkillsCategory.id,
      createdById: jenniferAdams.id,
      isFeatured: true,
    },
    {
      title: "Effective Communication",
      slug: "effective-communication",
      description: "Master the art of communication in professional and personal settings. Improve presentations, writing, and interpersonal skills.",
      duration: 300, // 5 hours
      difficulty: "BEGINNER" as const,
      price: 49,
      thumbnail: "/courses/communication.svg",
      tags: ["communication", "presentation", "writing", "speaking"],
      categoryId: softSkillsCategory.id,
      createdById: jenniferAdams.id,
      isFeatured: false,
    },
    {
      title: "Negotiation & Persuasion",
      slug: "negotiation-persuasion",
      description: "Learn proven negotiation techniques used by top business professionals. Master influence, persuasion, and deal-making strategies.",
      duration: 480, // 8 hours
      difficulty: "INTERMEDIATE" as const,
      price: 79,
      thumbnail: "/courses/negotiation.svg",
      tags: ["negotiation", "persuasion", "influence", "business"],
      categoryId: softSkillsCategory.id,
      createdById: jenniferAdams.id,
      isFeatured: false,
    },

    // Marketing (3 courses)
    {
      title: "Digital Marketing Mastery",
      slug: "digital-marketing-mastery",
      description: "Complete digital marketing course covering SEO, PPC, social media, and email marketing. Build comprehensive marketing campaigns.",
      duration: 840, // 14 hours
      difficulty: "BEGINNER" as const,
      price: 99,
      thumbnail: "/courses/digital-marketing.svg",
      tags: ["digital marketing", "seo", "ppc", "social media"],
      categoryId: marketingCategory.id,
      createdById: chrisTaylor.id,
      isFeatured: true,
    },
    {
      title: "Social Media Strategy",
      slug: "social-media-strategy",
      description: "Build a winning social media strategy that drives engagement and conversions. Master platforms from Instagram to TikTok to LinkedIn.",
      duration: 600, // 10 hours
      difficulty: "INTERMEDIATE" as const,
      price: 79,
      thumbnail: "/courses/social-media.svg",
      tags: ["social media", "instagram", "tiktok", "content"],
      categoryId: marketingCategory.id,
      createdById: chrisTaylor.id,
      isFeatured: false,
    },
    {
      title: "SEO & Content Marketing",
      slug: "seo-content-marketing",
      description: "Dominate search rankings and create content that attracts and converts. Learn keyword research, on-page SEO, link building, and content strategy.",
      duration: 720, // 12 hours
      difficulty: "INTERMEDIATE" as const,
      price: 89,
      thumbnail: "/courses/seo.svg",
      tags: ["seo", "content marketing", "keywords", "blogging"],
      categoryId: marketingCategory.id,
      createdById: chrisTaylor.id,
      isFeatured: true,
    },
  ];

  for (const courseDef of courseDefinitions) {
    const course = await prisma.course.upsert({
      where: { slug: courseDef.slug },
      update: {
        title: courseDef.title,
        description: courseDef.description,
        duration: courseDef.duration,
        difficulty: courseDef.difficulty,
        price: courseDef.price,
        thumbnail: courseDef.thumbnail,
        tags: courseDef.tags,
        isFeatured: courseDef.isFeatured,
      },
      create: {
        title: courseDef.title,
        slug: courseDef.slug,
        description: courseDef.description,
        duration: courseDef.duration,
        difficulty: courseDef.difficulty,
        isPublished: true,
        isFeatured: courseDef.isFeatured,
        price: courseDef.price,
        thumbnail: courseDef.thumbnail,
        tags: courseDef.tags,
        categoryId: courseDef.categoryId,
        createdById: courseDef.createdById,
      },
    });

    // Create a class for each course
    await prisma.class.upsert({
      where: { id: `class-${courseDef.slug}` },
      update: {},
      create: {
        id: `class-${courseDef.slug}`,
        name: "Self-Paced Cohort",
        description: "Learn at your own pace",
        startDate: new Date("2026-01-01"),
        endDate: new Date("2026-12-31"),
        maxStudents: 1000,
        isActive: true,
        courseId: course.id,
        trainerId: courseDef.createdById,
      },
    });
  }

  console.log("Database seeded successfully!");
  console.log("\nDemo accounts:");
  console.log("- Superadmin: admin@learnhub.com / admin123");
  console.log("- Trainer: trainer@learnhub.com / admin123");
  console.log("- Learner: learner@learnhub.com / admin123");
  console.log("\nCreated 15 sample courses across 5 categories!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
