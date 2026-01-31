"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Chrome, Loader2, GraduationCap, Users, Shield, Key, BookOpen, Settings } from "lucide-react";

const LEARNER_TRAINER_ACCOUNTS = [
  {
    role: "Learner",
    email: "learner@learnhub.com",
    password: "admin123",
    icon: GraduationCap,
    description: "Access courses, track progress, earn badges",
    color: "bg-blue-500/10 text-blue-500",
    redirect: "/learner",
  },
  {
    role: "Trainer",
    email: "trainer@learnhub.com",
    password: "admin123",
    icon: Users,
    description: "Create courses, manage classes, grade assignments",
    color: "bg-green-500/10 text-green-500",
    redirect: "/trainer",
  },
];

const ADMIN_ACCOUNTS = [
  {
    role: "Admin",
    email: "administrator@learnhub.com",
    password: "admin123",
    icon: Shield,
    description: "Manage users, courses, classes, and scheduling",
    color: "bg-orange-500/10 text-orange-500",
    redirect: "/admin",
  },
  {
    role: "Superadmin",
    email: "admin@learnhub.com",
    password: "admin123",
    icon: Key,
    description: "Full system access, API keys, payment settings",
    color: "bg-purple-500/10 text-purple-500",
    redirect: "/superadmin",
  },
];

type DemoAccount = typeof LEARNER_TRAINER_ACCOUNTS[0];

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/learner";
  const error = searchParams.get("error");

  const [isLoading, setIsLoading] = useState(false);
  const [loadingAccount, setLoadingAccount] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await signIn("credentials", {
      email,
      password,
      callbackUrl,
    });

    setIsLoading(false);
  };

  const handleOAuthSignIn = (provider: string) => {
    setIsLoading(true);
    signIn(provider, { callbackUrl });
  };

  const handleDemoLogin = async (account: DemoAccount) => {
    setLoadingAccount(account.role);
    await signIn("credentials", {
      email: account.email,
      password: account.password,
      callbackUrl: account.redirect,
    });
  };

  const renderAccountCard = (account: DemoAccount) => (
    <Card
      key={account.role}
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary"
      onClick={() => !loadingAccount && handleDemoLogin(account)}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${account.color}`}>
          <account.icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{account.role}</h3>
          <p className="text-sm text-muted-foreground">
            {account.description}
          </p>
        </div>
        <Button
          size="sm"
          disabled={loadingAccount !== null}
        >
          {loadingAccount === account.role ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome to LearnHub</h1>
        <p className="text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {error === "CredentialsSignin"
            ? "Invalid email or password"
            : "An error occurred. Please try again."}
        </div>
      )}

      <Tabs defaultValue="learner" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="learner" className="gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Learn</span>
          </TabsTrigger>
          <TabsTrigger value="admin" className="gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Admin</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="gap-2">
            Email
          </TabsTrigger>
        </TabsList>

        {/* Learner / Trainer Tab */}
        <TabsContent value="learner" className="space-y-4">
          <div className="rounded-lg bg-blue-500/5 p-3 text-center">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              For Learners & Trainers
            </p>
            <p className="text-xs text-muted-foreground">
              Access courses and manage classes
            </p>
          </div>
          <div className="grid gap-3">
            {LEARNER_TRAINER_ACCOUNTS.map(renderAccountCard)}
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or sign up
              </span>
            </div>
          </div>
          <div className="grid gap-3">
            <Button
              variant="outline"
              onClick={() => handleOAuthSignIn("google")}
              disabled={isLoading}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleOAuthSignIn("github")}
              disabled={isLoading}
            >
              <Github className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            New to LearnHub?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </TabsContent>

        {/* Admin / Superadmin Tab */}
        <TabsContent value="admin" className="space-y-4">
          <div className="rounded-lg bg-orange-500/5 p-3 text-center">
            <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
              For Administrators
            </p>
            <p className="text-xs text-muted-foreground">
              Manage platform settings and users
            </p>
          </div>
          <div className="grid gap-3">
            {ADMIN_ACCOUNTS.map(renderAccountCard)}
          </div>
          <p className="text-center text-xs text-muted-foreground">
            All demo accounts use password: <code className="rounded bg-muted px-1 py-0.5">admin123</code>
          </p>
        </TabsContent>

        {/* Email Login Tab */}
        <TabsContent value="email" className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid gap-3">
            <Button
              variant="outline"
              onClick={() => handleOAuthSignIn("google")}
              disabled={isLoading}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleOAuthSignIn("github")}
              disabled={isLoading}
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LoginSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <Skeleton className="mx-auto h-9 w-48" />
        <Skeleton className="mx-auto h-5 w-64" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}
