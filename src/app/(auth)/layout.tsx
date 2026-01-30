import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden w-1/2 bg-gradient-to-br from-primary via-primary/90 to-purple-600 lg:flex lg:flex-col lg:justify-between p-12">
        <Link href="/" className="flex items-center gap-2 text-white">
          <GraduationCap className="h-8 w-8" />
          <span className="text-xl font-bold">LearnHub</span>
        </Link>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Start your learning journey today
          </h1>
          <p className="text-lg text-white/80">
            Join thousands of learners transforming their careers with AI-powered education.
          </p>
        </div>
        <p className="text-sm text-white/60">
          &copy; {new Date().getFullYear()} LearnHub. All rights reserved.
        </p>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full flex-col justify-center px-4 lg:w-1/2 lg:px-16">
        <div className="lg:hidden mb-8">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">LearnHub</span>
          </Link>
        </div>
        <div className="mx-auto w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
