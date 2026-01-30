import { prisma } from "@/lib/prisma";
import { calculateLevel, getXpForNextLevel } from "@/lib/utils";
import type { XPAction } from "@/types";
import { XP_REWARDS } from "@/types";
import type { Prisma } from "@prisma/client";

export class GamificationService {
  /**
   * Award XP to a user
   */
  static async awardXP(
    userId: string,
    action: XPAction,
    metadata?: Prisma.InputJsonValue
  ) {
    const amount = XP_REWARDS[action];

    // Get or create gamification profile
    let profile = await prisma.gamificationProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      profile = await prisma.gamificationProfile.create({
        data: { userId },
      });
    }

    const newTotalXp = profile.totalXp + amount;
    const newLevel = calculateLevel(newTotalXp);
    const leveledUp = newLevel > profile.level;

    // Update profile and create transaction
    const [updatedProfile] = await prisma.$transaction([
      prisma.gamificationProfile.update({
        where: { userId },
        data: {
          totalXp: newTotalXp,
          level: newLevel,
          lastActivityAt: new Date(),
        },
      }),
      prisma.xPTransaction.create({
        data: {
          profileId: profile.id,
          amount,
          reason: this.getReasonText(action),
          metadata: metadata ? metadata : undefined,
        },
      }),
    ]);

    // Check for badge unlocks
    await this.checkBadgeUnlocks(userId, action, updatedProfile);

    return {
      xpAwarded: amount,
      newTotal: newTotalXp,
      leveledUp,
      newLevel: leveledUp ? newLevel : undefined,
    };
  }

  /**
   * Update user streak
   */
  static async updateStreak(userId: string) {
    const profile = await prisma.gamificationProfile.findUnique({
      where: { userId },
    });

    if (!profile) return;

    const now = new Date();
    const lastActivity = new Date(profile.lastActivityAt);
    const daysDiff = Math.floor(
      (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
    );

    let newStreak = profile.currentStreak;
    let streakBroken = false;

    if (daysDiff === 0) {
      // Same day, no change
      return { streak: newStreak, streakBroken: false };
    } else if (daysDiff === 1) {
      // Next day - extend streak
      newStreak += 1;
    } else {
      // Streak broken
      newStreak = 1;
      streakBroken = true;
    }

    const longestStreak = Math.max(profile.longestStreak, newStreak);

    await prisma.gamificationProfile.update({
      where: { userId },
      data: {
        currentStreak: newStreak,
        longestStreak,
        lastActivityAt: now,
      },
    });

    // Check for streak milestones
    if (newStreak === 7) {
      await this.awardXP(userId, "STREAK_7_DAY");
    } else if (newStreak === 30) {
      await this.awardXP(userId, "STREAK_30_DAY");
    }

    return { streak: newStreak, longestStreak, streakBroken };
  }

  /**
   * Check and unlock badges
   */
  static async checkBadgeUnlocks(
    userId: string,
    action: XPAction,
    profile: { totalXp: number; level: number; currentStreak: number }
  ) {
    const unlockedBadges: string[] = [];

    // Get all badges user doesn't have
    const availableBadges = await prisma.badge.findMany({
      where: {
        NOT: {
          earnedBy: {
            some: { userId },
          },
        },
      },
    });

    for (const badge of availableBadges) {
      const criteria = badge.criteria as { type: string; value: number | string };
      let shouldUnlock = false;

      switch (criteria.type) {
        case "xp_total":
          shouldUnlock = profile.totalXp >= Number(criteria.value);
          break;
        case "level":
          shouldUnlock = profile.level >= Number(criteria.value);
          break;
        case "streak":
          shouldUnlock = profile.currentStreak >= Number(criteria.value);
          break;
        case "action":
          shouldUnlock = action === String(criteria.value);
          break;
      }

      if (shouldUnlock) {
        await prisma.userBadge.create({
          data: {
            userId,
            badgeId: badge.id,
          },
        });

        // Award badge XP
        if (badge.xpReward > 0) {
          await prisma.gamificationProfile.update({
            where: { userId },
            data: {
              totalXp: { increment: badge.xpReward },
            },
          });
        }

        unlockedBadges.push(badge.name);
      }
    }

    return unlockedBadges;
  }

  /**
   * Get leaderboard for a class
   */
  static async getLeaderboard(classId: string, limit = 10) {
    const enrollments = await prisma.enrollment.findMany({
      where: { classId },
      include: {
        user: {
          include: {
            gamificationProfile: true,
          },
        },
      },
    });

    const leaderboard = enrollments
      .filter((e) => e.user.gamificationProfile)
      .map((e) => ({
        userId: e.userId,
        name: e.user.name,
        image: e.user.image,
        totalXp: e.user.gamificationProfile!.totalXp,
        level: e.user.gamificationProfile!.level,
      }))
      .sort((a, b) => b.totalXp - a.totalXp)
      .slice(0, limit);

    return leaderboard.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
  }

  /**
   * Get user's gamification stats
   */
  static async getUserStats(userId: string) {
    const profile = await prisma.gamificationProfile.findUnique({
      where: { userId },
      include: {
        xpHistory: {
          take: 10,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    const badges = await prisma.userBadge.findMany({
      where: { userId },
      include: { badge: true },
      orderBy: { earnedAt: "desc" },
    });

    if (!profile) {
      return null;
    }

    const currentLevelXp = profile.level > 1 ? getXpForNextLevel(profile.level - 1) : 0;
    const nextLevelXp = getXpForNextLevel(profile.level);
    const xpInCurrentLevel = profile.totalXp - currentLevelXp;
    const xpNeededForLevel = nextLevelXp - currentLevelXp;

    return {
      totalXp: profile.totalXp,
      level: profile.level,
      currentStreak: profile.currentStreak,
      longestStreak: profile.longestStreak,
      xpToNextLevel: nextLevelXp - profile.totalXp,
      progressToNextLevel: (xpInCurrentLevel / xpNeededForLevel) * 100,
      badges: badges.map((ub) => ({
        id: ub.badge.id,
        name: ub.badge.name,
        description: ub.badge.description,
        icon: ub.badge.icon,
        rarity: ub.badge.rarity,
        earnedAt: ub.earnedAt,
      })),
      recentActivity: profile.xpHistory,
    };
  }

  private static getReasonText(action: XPAction): string {
    const reasons: Record<XPAction, string> = {
      LESSON_COMPLETE: "Completed a lesson",
      ASSIGNMENT_SUBMIT: "Submitted an assignment",
      ASSIGNMENT_PASS: "Passed an assignment",
      ASSIGNMENT_PERFECT: "Perfect score on assignment",
      DAILY_LOGIN: "Daily login bonus",
      STREAK_7_DAY: "7-day learning streak",
      STREAK_30_DAY: "30-day learning streak",
      FIRST_DISCUSSION: "First discussion post",
      HELP_LEARNER: "Helped another learner",
    };
    return reasons[action];
  }
}
