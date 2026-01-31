"use client";

interface DaysRemainingProps {
  endDate: Date;
}

export function DaysRemaining({ endDate }: DaysRemainingProps) {
  const days = Math.max(
    0,
    Math.ceil(
      (new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    )
  );

  return <div className="text-2xl font-bold">{days}</div>;
}
