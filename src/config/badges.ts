import type { BadgeRarity } from "@prisma/client";

export interface BadgeDefinition {
  name: string;
  description: string;
  icon: string;
  criteria: {
    type: "xp_total" | "level" | "streak" | "lessons_completed" | "assignments_completed" | "action";
    value: number | string;
  };
  xpReward: number;
  rarity: BadgeRarity;
  category: "completion" | "excellence" | "social" | "dedication" | "special";
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  // Completion Badges
  {
    name: "First Steps",
    description: "Complete your first lesson",
    icon: "footprints",
    criteria: { type: "lessons_completed", value: 1 },
    xpReward: 50,
    rarity: "COMMON",
    category: "completion",
  },
  {
    name: "Quick Learner",
    description: "Complete 10 lessons",
    icon: "rocket",
    criteria: { type: "lessons_completed", value: 10 },
    xpReward: 100,
    rarity: "COMMON",
    category: "completion",
  },
  {
    name: "Knowledge Seeker",
    description: "Complete 50 lessons",
    icon: "book-open",
    criteria: { type: "lessons_completed", value: 50 },
    xpReward: 250,
    rarity: "UNCOMMON",
    category: "completion",
  },
  {
    name: "Master Student",
    description: "Complete 100 lessons",
    icon: "graduation-cap",
    criteria: { type: "lessons_completed", value: 100 },
    xpReward: 500,
    rarity: "RARE",
    category: "completion",
  },

  // Excellence Badges
  {
    name: "Perfectionist",
    description: "Get a perfect score on an assignment",
    icon: "star",
    criteria: { type: "action", value: "ASSIGNMENT_PERFECT" },
    xpReward: 100,
    rarity: "UNCOMMON",
    category: "excellence",
  },
  {
    name: "Overachiever",
    description: "Get 5 perfect scores",
    icon: "trophy",
    criteria: { type: "assignments_completed", value: 5 },
    xpReward: 300,
    rarity: "RARE",
    category: "excellence",
  },

  // Dedication Badges
  {
    name: "Consistent",
    description: "Maintain a 7-day learning streak",
    icon: "flame",
    criteria: { type: "streak", value: 7 },
    xpReward: 100,
    rarity: "COMMON",
    category: "dedication",
  },
  {
    name: "Dedicated",
    description: "Maintain a 30-day learning streak",
    icon: "fire-extinguisher",
    criteria: { type: "streak", value: 30 },
    xpReward: 500,
    rarity: "RARE",
    category: "dedication",
  },
  {
    name: "Unstoppable",
    description: "Maintain a 100-day learning streak",
    icon: "zap",
    criteria: { type: "streak", value: 100 },
    xpReward: 2000,
    rarity: "LEGENDARY",
    category: "dedication",
  },

  // Level Badges
  {
    name: "Rising Star",
    description: "Reach level 5",
    icon: "trending-up",
    criteria: { type: "level", value: 5 },
    xpReward: 200,
    rarity: "UNCOMMON",
    category: "special",
  },
  {
    name: "Expert",
    description: "Reach level 10",
    icon: "award",
    criteria: { type: "level", value: 10 },
    xpReward: 500,
    rarity: "EPIC",
    category: "special",
  },

  // XP Badges
  {
    name: "XP Hunter",
    description: "Earn 1,000 XP",
    icon: "target",
    criteria: { type: "xp_total", value: 1000 },
    xpReward: 50,
    rarity: "COMMON",
    category: "special",
  },
  {
    name: "XP Master",
    description: "Earn 10,000 XP",
    icon: "crown",
    criteria: { type: "xp_total", value: 10000 },
    xpReward: 200,
    rarity: "RARE",
    category: "special",
  },
  {
    name: "XP Legend",
    description: "Earn 100,000 XP",
    icon: "sparkles",
    criteria: { type: "xp_total", value: 100000 },
    xpReward: 1000,
    rarity: "LEGENDARY",
    category: "special",
  },

  // Social Badges
  {
    name: "Conversationalist",
    description: "Start your first discussion",
    icon: "message-circle",
    criteria: { type: "action", value: "FIRST_DISCUSSION" },
    xpReward: 25,
    rarity: "COMMON",
    category: "social",
  },
  {
    name: "Helpful Peer",
    description: "Help another learner",
    icon: "heart-handshake",
    criteria: { type: "action", value: "HELP_LEARNER" },
    xpReward: 50,
    rarity: "UNCOMMON",
    category: "social",
  },
];
