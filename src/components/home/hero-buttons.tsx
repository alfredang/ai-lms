"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegisterModal } from "@/components/auth/register-modal";

export function HeroButtons() {
  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <RegisterModal>
        <Button size="lg">
          Get Started Free
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </RegisterModal>
      <Button size="lg" variant="outline" asChild>
        <Link href="/courses">
          <Play className="mr-2 h-4 w-4" />
          Browse Courses
        </Link>
      </Button>
    </div>
  );
}

export function CTAButtons() {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <RegisterModal>
        <Button size="lg">
          Create Free Account
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </RegisterModal>
      <Button size="lg" variant="outline" asChild>
        <Link href="/courses">View All Courses</Link>
      </Button>
    </div>
  );
}
