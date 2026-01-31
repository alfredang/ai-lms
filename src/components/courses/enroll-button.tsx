"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface EnrollButtonProps {
  courseId: string;
  classId: string;
  courseSlug: string;
  isLoggedIn: boolean;
  price: number;
}

export function EnrollButton({
  courseId,
  classId,
  courseSlug,
  isLoggedIn,
  price,
}: EnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEnroll = async () => {
    if (!isLoggedIn) {
      // Redirect to login with return URL
      router.push(`/login?callbackUrl=/courses/${courseSlug}`);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classId,
          courseId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to learner course page
        router.push(`/learner/courses/${courseSlug}`);
      } else {
        // Handle error
        alert(data.error || "Failed to enroll. Please try again.");
      }
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="w-full"
      size="lg"
      onClick={handleEnroll}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Enrolling...
        </>
      ) : isLoggedIn ? (
        price > 0 ? "Enroll Now" : "Enroll for Free"
      ) : (
        "Login to Enroll"
      )}
    </Button>
  );
}
