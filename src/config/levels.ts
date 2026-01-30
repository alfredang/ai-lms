export interface LevelDefinition {
  level: number;
  xpRequired: number;
  title: string;
  color: string;
}

export const LEVEL_DEFINITIONS: LevelDefinition[] = [
  { level: 1, xpRequired: 0, title: "Novice", color: "#9CA3AF" },
  { level: 2, xpRequired: 500, title: "Beginner", color: "#10B981" },
  { level: 3, xpRequired: 1500, title: "Apprentice", color: "#3B82F6" },
  { level: 4, xpRequired: 3500, title: "Intermediate", color: "#8B5CF6" },
  { level: 5, xpRequired: 7000, title: "Advanced", color: "#F59E0B" },
  { level: 6, xpRequired: 12000, title: "Expert", color: "#EF4444" },
  { level: 7, xpRequired: 20000, title: "Master", color: "#EC4899" },
  { level: 8, xpRequired: 35000, title: "Grandmaster", color: "#14B8A6" },
  { level: 9, xpRequired: 60000, title: "Legend", color: "#F97316" },
  { level: 10, xpRequired: 100000, title: "Sage", color: "#FFD700" },
];

export function getLevelByXp(xp: number): LevelDefinition {
  for (let i = LEVEL_DEFINITIONS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_DEFINITIONS[i].xpRequired) {
      return LEVEL_DEFINITIONS[i];
    }
  }
  return LEVEL_DEFINITIONS[0];
}

export function getXpProgress(xp: number): {
  currentLevel: LevelDefinition;
  nextLevel: LevelDefinition | null;
  progress: number;
  xpInLevel: number;
  xpForLevel: number;
} {
  const currentLevel = getLevelByXp(xp);
  const currentIndex = LEVEL_DEFINITIONS.findIndex(
    (l) => l.level === currentLevel.level
  );
  const nextLevel =
    currentIndex < LEVEL_DEFINITIONS.length - 1
      ? LEVEL_DEFINITIONS[currentIndex + 1]
      : null;

  if (!nextLevel) {
    return {
      currentLevel,
      nextLevel: null,
      progress: 100,
      xpInLevel: xp - currentLevel.xpRequired,
      xpForLevel: 0,
    };
  }

  const xpInLevel = xp - currentLevel.xpRequired;
  const xpForLevel = nextLevel.xpRequired - currentLevel.xpRequired;
  const progress = (xpInLevel / xpForLevel) * 100;

  return {
    currentLevel,
    nextLevel,
    progress,
    xpInLevel,
    xpForLevel,
  };
}
