import { config } from "dotenv";
config();

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Adding real estate training courses...");

  // Get or create Real Estate category
  let realEstateCategory = await prisma.category.findUnique({
    where: { slug: "real-estate" },
  });

  if (!realEstateCategory) {
    realEstateCategory = await prisma.category.create({
      data: {
        name: "Real Estate",
        slug: "real-estate",
        description: "Professional real estate training and certification courses",
        icon: "building",
      },
    });
    console.log("Created Real Estate category");
  }

  // Get trainer user
  const trainer = await prisma.user.findFirst({
    where: { role: { name: "TRAINER" } },
  });

  if (!trainer) {
    console.error("No trainer found. Please run db:seed first.");
    return;
  }

  // Real Estate Courses
  const courses = [
    {
      title: "Real Estate Fundamentals",
      slug: "real-estate-fundamentals",
      description:
        "Master the basics of real estate including property types, market analysis, legal considerations, and investment principles. Perfect for beginners entering the real estate industry.",
      duration: 600, // 10 hours
      difficulty: "BEGINNER" as const,
      isPublished: true,
      isFeatured: true,
      tags: ["real estate", "fundamentals", "property", "investment", "beginner"],
    },
    {
      title: "Property Valuation & Appraisal",
      slug: "property-valuation-appraisal",
      description:
        "Learn professional property valuation techniques including comparative market analysis, income approach, cost approach, and factors affecting property values.",
      duration: 480, // 8 hours
      difficulty: "INTERMEDIATE" as const,
      isPublished: true,
      isFeatured: true,
      tags: ["valuation", "appraisal", "CMA", "property analysis"],
    },
    {
      title: "Real Estate Sales & Negotiation",
      slug: "real-estate-sales-negotiation",
      description:
        "Develop advanced sales techniques and negotiation strategies specific to real estate transactions. Learn to close deals effectively and build lasting client relationships.",
      duration: 540, // 9 hours
      difficulty: "INTERMEDIATE" as const,
      isPublished: true,
      isFeatured: false,
      tags: ["sales", "negotiation", "closing", "client relations"],
    },
    {
      title: "Commercial Real Estate Investment",
      slug: "commercial-real-estate-investment",
      description:
        "Comprehensive guide to commercial property investment including office, retail, industrial, and multifamily properties. Learn financial analysis, due diligence, and portfolio management.",
      duration: 720, // 12 hours
      difficulty: "ADVANCED" as const,
      isPublished: true,
      isFeatured: true,
      tags: ["commercial", "investment", "portfolio", "financial analysis"],
    },
    {
      title: "Real Estate Law & Contracts",
      slug: "real-estate-law-contracts",
      description:
        "Understanding real estate legal frameworks, contracts, disclosures, title insurance, and compliance requirements. Essential knowledge for agents and investors.",
      duration: 420, // 7 hours
      difficulty: "INTERMEDIATE" as const,
      isPublished: true,
      isFeatured: false,
      tags: ["legal", "contracts", "compliance", "title", "disclosure"],
    },
    {
      title: "Real Estate Marketing & Lead Generation",
      slug: "real-estate-marketing-lead-generation",
      description:
        "Modern marketing strategies for real estate professionals including digital marketing, social media, content creation, and building a personal brand.",
      duration: 360, // 6 hours
      difficulty: "BEGINNER" as const,
      isPublished: true,
      isFeatured: false,
      tags: ["marketing", "lead generation", "social media", "branding"],
    },
    {
      title: "Property Management Essentials",
      slug: "property-management-essentials",
      description:
        "Complete property management training covering tenant relations, maintenance, rent collection, legal compliance, and maximizing property ROI.",
      duration: 480, // 8 hours
      difficulty: "INTERMEDIATE" as const,
      isPublished: true,
      isFeatured: false,
      tags: ["property management", "tenant relations", "maintenance", "ROI"],
    },
    {
      title: "Real Estate Investment Analysis",
      slug: "real-estate-investment-analysis",
      description:
        "Advanced financial modeling for real estate investments. Learn cap rates, cash-on-cash returns, IRR, NPV analysis, and how to evaluate investment opportunities.",
      duration: 540, // 9 hours
      difficulty: "ADVANCED" as const,
      isPublished: true,
      isFeatured: false,
      tags: ["investment analysis", "financial modeling", "cap rate", "IRR"],
    },
    {
      title: "Luxury Real Estate Specialist",
      slug: "luxury-real-estate-specialist",
      description:
        "Specialize in high-end properties and affluent clients. Learn luxury market dynamics, exclusive marketing strategies, and white-glove client service.",
      duration: 420, // 7 hours
      difficulty: "ADVANCED" as const,
      isPublished: true,
      isFeatured: true,
      tags: ["luxury", "high-end", "affluent clients", "exclusive marketing"],
    },
    {
      title: "First-Time Home Buyer Specialist",
      slug: "first-time-home-buyer-specialist",
      description:
        "Become an expert in guiding first-time buyers through the home purchasing process. Learn financing options, FHA/VA loans, and building trust with new buyers.",
      duration: 300, // 5 hours
      difficulty: "BEGINNER" as const,
      isPublished: true,
      isFeatured: false,
      tags: ["first-time buyers", "FHA", "VA loans", "buyer specialist"],
    },
  ];

  for (const courseData of courses) {
    const existing = await prisma.course.findUnique({
      where: { slug: courseData.slug },
    });

    if (existing) {
      console.log(`Course already exists: ${courseData.title}`);
      continue;
    }

    const course = await prisma.course.create({
      data: {
        ...courseData,
        categoryId: realEstateCategory.id,
        createdById: trainer.id,
      },
    });

    // Create a class for each course
    const classData = await prisma.class.create({
      data: {
        name: "Self-Paced Cohort",
        description: "Learn at your own pace with lifetime access",
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        maxStudents: 500,
        isActive: true,
        courseId: course.id,
        trainerId: trainer.id,
      },
    });

    // Create sample lessons for each course
    const lessons = [
      { title: "Introduction & Course Overview", duration: 30 },
      { title: "Key Concepts & Terminology", duration: 45 },
      { title: "Core Principles & Best Practices", duration: 60 },
      { title: "Practical Applications", duration: 45 },
      { title: "Case Studies & Examples", duration: 60 },
      { title: "Assessment & Certification", duration: 30 },
    ];

    for (let i = 0; i < lessons.length; i++) {
      await prisma.lesson.create({
        data: {
          title: lessons[i].title,
          description: `${lessons[i].title} for ${courseData.title}`,
          order: i + 1,
          duration: lessons[i].duration,
          isPublished: true,
          classId: classData.id,
        },
      });
    }

    console.log(`Created course: ${courseData.title} with ${lessons.length} lessons`);
  }

  console.log("\nReal estate courses added successfully!");
  console.log("\nCourse summary:");
  const count = await prisma.course.count({
    where: { category: { slug: "real-estate" } },
  });
  console.log(`Total real estate courses: ${count}`);
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
