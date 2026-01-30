import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export function generateCertificateId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 12; i++) {
    if (i > 0 && i % 4 === 0) result += "-";
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function calculateLevel(xp: number): number {
  const thresholds = [0, 500, 1500, 3500, 7000, 12000, 20000, 35000, 60000, 100000];
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i]) {
      return i + 1;
    }
  }
  return 1;
}

export function getXpForNextLevel(currentLevel: number): number {
  const thresholds = [0, 500, 1500, 3500, 7000, 12000, 20000, 35000, 60000, 100000];
  if (currentLevel >= thresholds.length) {
    return thresholds[thresholds.length - 1];
  }
  return thresholds[currentLevel];
}

export function getLevelTitle(level: number): string {
  const titles = [
    "Novice",
    "Beginner",
    "Apprentice",
    "Intermediate",
    "Advanced",
    "Expert",
    "Master",
    "Grandmaster",
    "Legend",
    "Sage",
  ];
  return titles[Math.min(level - 1, titles.length - 1)];
}
