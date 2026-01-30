"use client";

import { Progress } from "@/components/ui/progress";
import { getXpForNextLevel, getLevelTitle } from "@/lib/utils";
import { Zap } from "lucide-react";

interface XPBarProps {
  totalXp: number;
  level: number;
  showDetails?: boolean;
}

export function XPBar({ totalXp, level, showDetails = true }: XPBarProps) {
  const currentLevelXp = level > 1 ? getXpForNextLevel(level - 1) : 0;
  const nextLevelXp = getXpForNextLevel(level);
  const xpInCurrentLevel = totalXp - currentLevelXp;
  const xpNeededForLevel = nextLevelXp - currentLevelXp;
  const progress = (xpInCurrentLevel / xpNeededForLevel) * 100;
  const levelTitle = getLevelTitle(level);

  return (
    <div className="space-y-2">
      {showDetails && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {level}
            </div>
            <div>
              <p className="font-medium">{levelTitle}</p>
              <p className="text-xs text-muted-foreground">Level {level}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <Zap className="h-4 w-4" />
            <span className="font-semibold">{totalXp.toLocaleString()} XP</span>
          </div>
        </div>
      )}
      <div className="space-y-1">
        <Progress value={progress} className="h-2" />
        {showDetails && (
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{xpInCurrentLevel.toLocaleString()} XP</span>
            <span>{xpNeededForLevel.toLocaleString()} XP to Level {level + 1}</span>
          </div>
        )}
      </div>
    </div>
  );
}
