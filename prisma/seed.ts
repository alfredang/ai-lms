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
    update: {
      name: "Super Admin",
      password: hashedPassword,
      roleId: superadminRole.id,
    },
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

  // Create demo admin
  const admin = await prisma.user.upsert({
    where: { email: "administrator@learnhub.com" },
    update: {
      name: "Demo Admin",
      password: hashedPassword,
      roleId: adminRole.id,
    },
    create: {
      email: "administrator@learnhub.com",
      name: "Demo Admin",
      password: hashedPassword,
      roleId: adminRole.id,
      gamificationProfile: {
        create: {
          totalXp: 3000,
          level: 4,
        },
      },
    },
  });

  // Create demo learner
  const learner = await prisma.user.upsert({
    where: { email: "learner@learnhub.com" },
    update: {
      name: "Demo Learner",
      password: hashedPassword,
      roleId: learnerRole.id,
    },
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

  // Delete ALL existing courses and old categories for a clean slate
  console.log("Cleaning up existing courses and old categories...");

  // Delete in correct order to respect foreign key constraints
  await prisma.lessonProgress.deleteMany({});
  await prisma.submission.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.material.deleteMany({});
  await prisma.assignment.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.certificate.deleteMany({});
  await prisma.class.deleteMany({});
  await prisma.course.deleteMany({});

  // Delete old categories
  const oldCategorySlugs = [
    "mobile-development",
    "web-development",
    "ai-machine-learning",
    "data-science",
    "devops",
    "marketing", // old marketing category
    "vibe-coding", // renamed to full-stack-vibe-coding
  ];

  for (const slug of oldCategorySlugs) {
    try {
      await prisma.category.deleteMany({ where: { slug } });
    } catch {
      // Category might not exist, ignore
    }
  }

  // Create NEW categories
  console.log("Creating categories...");
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "real-estate" },
      update: { name: "Real Estate", icon: "Home" },
      create: {
        name: "Real Estate",
        slug: "real-estate",
        description: "Property investment, home buying, and real estate development strategies",
        icon: "🏠",
      },
    }),
    prisma.category.upsert({
      where: { slug: "investment" },
      update: { name: "Investment", icon: "📈" },
      create: {
        name: "Investment",
        slug: "investment",
        description: "Stock market, crypto, and portfolio management strategies",
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
      where: { slug: "full-stack-vibe-coding" },
      update: { name: "Full Stack & Vibe Coding", icon: "💻" },
      create: {
        name: "Full Stack & Vibe Coding",
        slug: "full-stack-vibe-coding",
        description: "Modern full-stack development with AI-powered coding tools",
        icon: "💻",
      },
    }),
    prisma.category.upsert({
      where: { slug: "cloud-computing" },
      update: { name: "Cloud Computing", icon: "☁️" },
      create: {
        name: "Cloud Computing",
        slug: "cloud-computing",
        description: "AWS, Azure, GCP, and cloud architecture fundamentals",
        icon: "☁️",
      },
    }),
    prisma.category.upsert({
      where: { slug: "digital-marketing" },
      update: { name: "Digital Marketing", icon: "📣" },
      create: {
        name: "Digital Marketing",
        slug: "digital-marketing",
        description: "SEO, social media, content marketing, and digital advertising strategies",
        icon: "📣",
      },
    }),
  ]);

  const [realEstateCategory, investmentCategory, softSkillsCategory, genAiCategory, fullStackCategory, cloudCategory, digitalMarketingCategory] = categories;

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
    // Real Estate (3 courses)
    {
      title: "First-Time Home Buyer Specialist",
      slug: "first-time-home-buyer-specialist",
      description: "Become an expert in guiding first-time buyers through the home purchasing process. Learn financing options, negotiation strategies, and market analysis.",
      duration: 300, // 5 hours
      difficulty: "BEGINNER" as const,
      deliveryFormat: "INSTRUCTOR_LED" as const,
      sessionType: "CLASSROOM" as const,
      price: 79,
      thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      tags: ["real estate", "home buying", "first-time buyer", "financing"],
      categoryId: realEstateCategory.id,
      createdById: demoTrainer.id,
      isFeatured: true,
    },
    {
      title: "Luxury Real Estate Specialist",
      slug: "luxury-real-estate-specialist",
      description: "Specialize in high-end properties and affluent clients. Learn luxury market dynamics, exclusive marketing techniques, and white-glove service standards.",
      duration: 420, // 7 hours
      difficulty: "ADVANCED" as const,
      deliveryFormat: "INSTRUCTOR_LED" as const,
      sessionType: "VIRTUAL" as const,
      price: 149,
      thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      tags: ["luxury real estate", "high-net-worth", "premium properties"],
      categoryId: realEstateCategory.id,
      createdById: demoTrainer.id,
      isFeatured: true,
    },
    {
      title: "Real Estate Investment Analysis",
      slug: "real-estate-investment-analysis",
      description: "Advanced financial modeling for real estate investments. Learn cap rates, cash-on-cash returns, IRR calculations, and portfolio optimization.",
      duration: 540, // 9 hours
      difficulty: "ADVANCED" as const,
      deliveryFormat: "E_LEARNING" as const,
      sessionType: "VIRTUAL" as const,
      price: 129,
      thumbnail: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop",
      tags: ["investment analysis", "financial modeling", "cap rate", "roi"],
      categoryId: realEstateCategory.id,
      createdById: davidChen.id,
      isFeatured: false,
    },

    // Investment (3 courses)
    {
      title: "Stock Market Fundamentals",
      slug: "stock-market-fundamentals",
      description: "Learn the fundamentals of stock market investing, from reading charts to building portfolios. Perfect for beginners starting their investment journey.",
      duration: 480, // 8 hours
      difficulty: "BEGINNER" as const,
      deliveryFormat: "E_LEARNING" as const,
      sessionType: "VIRTUAL" as const,
      price: 69,
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
      tags: ["stocks", "investing", "portfolio", "trading"],
      categoryId: investmentCategory.id,
      createdById: davidChen.id,
      isFeatured: true,
    },
    {
      title: "Crypto & DeFi Investing",
      slug: "crypto-defi-investing",
      description: "Navigate the world of cryptocurrency and decentralized finance with confidence. Learn about Bitcoin, Ethereum, DeFi protocols, and risk management.",
      duration: 720, // 12 hours
      difficulty: "INTERMEDIATE" as const,
      deliveryFormat: "E_LEARNING" as const,
      sessionType: "VIRTUAL" as const,
      price: 89,
      thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
      tags: ["crypto", "defi", "bitcoin", "ethereum"],
      categoryId: investmentCategory.id,
      createdById: davidChen.id,
      isFeatured: true,
    },
    {
      title: "Dividend Income Strategies",
      slug: "dividend-income-strategies",
      description: "Build a passive income portfolio through dividend investing. Learn stock selection, reinvestment strategies, and tax optimization techniques.",
      duration: 360, // 6 hours
      difficulty: "INTERMEDIATE" as const,
      deliveryFormat: "E_LEARNING" as const,
      sessionType: "VIRTUAL" as const,
      price: 79,
      thumbnail: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&h=600&fit=crop",
      tags: ["dividends", "passive income", "portfolio", "investing"],
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
      deliveryFormat: "INSTRUCTOR_LED" as const,
      sessionType: "CLASSROOM" as const,
      price: 59,
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
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
      deliveryFormat: "INSTRUCTOR_LED" as const,
      sessionType: "VIRTUAL" as const,
      price: 49,
      thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop",
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
      deliveryFormat: "INSTRUCTOR_LED" as const,
      sessionType: "CLASSROOM" as const,
      price: 79,
      thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
      tags: ["negotiation", "persuasion", "influence", "business"],
      categoryId: softSkillsCategory.id,
      createdById: jenniferAdams.id,
      isFeatured: true,
    },

    // Gen AI & Agentic AI (3 courses)
    {
      title: "Building AI Agents with LangChain",
      slug: "building-ai-agents-langchain",
      description: "Learn to build powerful AI agents using LangChain, from basic concepts to advanced autonomous systems. Master chains, tools, and agent architectures.",
      duration: 720, // 12 hours
      difficulty: "INTERMEDIATE" as const,
      deliveryFormat: "INSTRUCTOR_LED" as const,
      sessionType: "VIRTUAL" as const,
      price: 99,
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
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
      deliveryFormat: "E_LEARNING" as const,
      sessionType: "VIRTUAL" as const,
      price: 79,
      thumbnail: "https://images.unsplash.com/photo-1684163761883-4c0e76cb7d8a?w=800&h=600&fit=crop",
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
      deliveryFormat: "E_LEARNING" as const,
      sessionType: "VIRTUAL" as const,
      price: 89,
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop",
      tags: ["api", "claude", "openai", "python", "typescript"],
      categoryId: genAiCategory.id,
      createdById: sarahChen.id,
      isFeatured: false,
    },

    // Full Stack & Vibe Coding (3 courses)
    {
      title: "Modern React with AI Tools",
      slug: "modern-react-ai-tools",
      description: "Learn modern React development enhanced with AI coding assistants for 10x productivity. Integrate Copilot, Cursor, and more into your workflow.",
      duration: 900, // 15 hours
      difficulty: "INTERMEDIATE" as const,
      deliveryFormat: "INSTRUCTOR_LED" as const,
      sessionType: "VIRTUAL" as const,
      price: 119,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
      tags: ["react", "ai tools", "copilot", "cursor"],
      categoryId: fullStackCategory.id,
      createdById: emmaWilson.id,
      isFeatured: true,
    },
    {
      title: "Full-Stack Development with Cursor",
      slug: "fullstack-development-cursor",
      description: "Master full-stack development using Cursor AI to build applications faster than ever. From frontend to backend with AI assistance.",
      duration: 1200, // 20 hours
      difficulty: "ADVANCED" as const,
      deliveryFormat: "INSTRUCTOR_LED" as const,
      sessionType: "VIRTUAL" as const,
      price: 149,
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
      tags: ["cursor", "fullstack", "ai coding", "typescript"],
      categoryId: fullStackCategory.id,
      createdById: emmaWilson.id,
      isFeatured: false,
    },
    {
      title: "Building Apps with Claude Code",
      slug: "building-apps-claude-code",
      description: "Create complete applications from scratch using Claude Code AI-powered development. Learn prompting strategies for code generation.",
      duration: 600, // 10 hours
      difficulty: "BEGINNER" as const,
      deliveryFormat: "E_LEARNING" as const,
      sessionType: "VIRTUAL" as const,
      price: 99,
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      tags: ["claude code", "ai development", "coding"],
      categoryId: fullStackCategory.id,
      createdById: alexRodriguez.id,
      isFeatured: true,
    },

    // Cloud Computing (3 courses)
    {
      title: "AWS Solutions Architect",
      slug: "aws-solutions-architect",
      description: "Prepare for the AWS Solutions Architect certification. Learn EC2, S3, VPC, Lambda, and design highly available, scalable architectures.",
      duration: 960, // 16 hours
      difficulty: "INTERMEDIATE" as const,
      deliveryFormat: "INSTRUCTOR_LED" as const,
      sessionType: "VIRTUAL" as const,
      price: 129,
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      tags: ["aws", "cloud", "solutions architect", "certification"],
      categoryId: cloudCategory.id,
      createdById: chrisTaylor.id,
      isFeatured: true,
    },
    {
      title: "Kubernetes & Container Orchestration",
      slug: "kubernetes-container-orchestration",
      description: "Master Kubernetes for container orchestration. Learn pods, deployments, services, Helm charts, and production-ready cluster management.",
      duration: 840, // 14 hours
      difficulty: "ADVANCED" as const,
      deliveryFormat: "INSTRUCTOR_LED" as const,
      sessionType: "CLASSROOM" as const,
      price: 139,
      thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop",
      tags: ["kubernetes", "docker", "containers", "devops"],
      categoryId: cloudCategory.id,
      createdById: chrisTaylor.id,
      isFeatured: true,
    },
    {
      title: "Serverless Architecture Patterns",
      slug: "serverless-architecture-patterns",
      description: "Build cost-effective serverless applications with AWS Lambda, API Gateway, and DynamoDB. Learn event-driven architecture and best practices.",
      duration: 600, // 10 hours
      difficulty: "INTERMEDIATE" as const,
      deliveryFormat: "E_LEARNING" as const,
      sessionType: "VIRTUAL" as const,
      price: 99,
      thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop",
      tags: ["serverless", "lambda", "api gateway", "dynamodb"],
      categoryId: cloudCategory.id,
      createdById: chrisTaylor.id,
      isFeatured: false,
    },

    // Digital Marketing (3 courses)
    {
      title: "SEO Mastery",
      slug: "seo-mastery",
      description: "Master search engine optimization to drive organic traffic. Learn keyword research, on-page SEO, technical SEO, and link building strategies.",
      duration: 720, // 12 hours
      difficulty: "BEGINNER" as const,
      deliveryFormat: "E_LEARNING" as const,
      sessionType: "VIRTUAL" as const,
      price: 89,
      thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=600&fit=crop",
      tags: ["seo", "search engine", "organic traffic", "keywords"],
      categoryId: digitalMarketingCategory.id,
      createdById: chrisTaylor.id,
      isFeatured: true,
    },
    {
      title: "Social Media Marketing",
      slug: "social-media-marketing",
      description: "Build a winning social media strategy across platforms. Learn content creation, community management, and paid social advertising.",
      duration: 600, // 10 hours
      difficulty: "BEGINNER" as const,
      deliveryFormat: "INSTRUCTOR_LED" as const,
      sessionType: "VIRTUAL" as const,
      price: 79,
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
      tags: ["social media", "instagram", "facebook", "content"],
      categoryId: digitalMarketingCategory.id,
      createdById: jenniferAdams.id,
      isFeatured: true,
    },
    {
      title: "Google Ads & PPC Campaigns",
      slug: "google-ads-ppc-campaigns",
      description: "Create and optimize high-converting Google Ads campaigns. Learn keyword bidding, ad copywriting, landing pages, and conversion tracking.",
      duration: 540, // 9 hours
      difficulty: "INTERMEDIATE" as const,
      deliveryFormat: "E_LEARNING" as const,
      sessionType: "VIRTUAL" as const,
      price: 99,
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      tags: ["google ads", "ppc", "paid advertising", "sem"],
      categoryId: digitalMarketingCategory.id,
      createdById: chrisTaylor.id,
      isFeatured: false,
    },
  ];

  for (const courseDef of courseDefinitions) {
    const course = await prisma.course.create({
      data: {
        title: courseDef.title,
        slug: courseDef.slug,
        description: courseDef.description,
        duration: courseDef.duration,
        difficulty: courseDef.difficulty,
        deliveryFormat: courseDef.deliveryFormat,
        sessionType: courseDef.sessionType,
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
  console.log("\nDemo accounts (all passwords: admin123):");
  console.log("- Superadmin: admin@learnhub.com");
  console.log("- Admin: administrator@learnhub.com");
  console.log("- Trainer: trainer@learnhub.com");
  console.log("- Learner: learner@learnhub.com");
  console.log("\nCreated 21 sample courses across 7 categories!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
