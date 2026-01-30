"use client";

import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  size?: "sm" | "md" | "lg";
}

export function StreakCounter({
  currentStreak,
  longestStreak,
  size = "md",
}: StreakCounterProps) {
  const isActive = currentStreak > 0;

  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-12 w-12 text-lg",
    lg: "h-16 w-16 text-2xl",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full",
          sizeClasses[size],
          isActive
            ? "bg-gradient-to-br from-orange-400 to-red-500 text-white"
            : "bg-muted text-muted-foreground"
        )}
      >
        <Flame
          className={cn(
            iconSizes[size],
            isActive && "animate-flame"
          )}
        />
        {isActive && (
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-background text-xs font-bold shadow-sm">
            {currentStreak}
          </div>
        )}
      </div>
      <div className="text-center">
        <p className="font-semibold">
          {currentStreak} Day{currentStreak !== 1 ? "s" : ""}
        </p>
        <p className="text-xs text-muted-foreground">
          Best: {longestStreak} day{longestStreak !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
