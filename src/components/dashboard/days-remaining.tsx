"use client";

import { useState, useEffect } from "react";

interface DaysRemainingProps {
  endDate: Date;
}

export function DaysRemaining({ endDate }: DaysRemainingProps) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const calculateDays = () => {
      const remaining = Math.max(
        0,
        Math.ceil(
          (new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        )
      );
      setDays(remaining);
    };

    calculateDays();
  }, [endDate]);

  if (days === null) {
    return <div className="text-2xl font-bold">-</div>;
  }

  return <div className="text-2xl font-bold">{days}</div>;
}
