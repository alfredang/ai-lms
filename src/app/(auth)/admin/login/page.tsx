"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  AlertTriangle,
  ArrowLeft,
  Crown,
  UserCog,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"admin" | "superadmin">("admin");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials or insufficient permissions");
      } else {
        // Redirect based on tab selection
        router.push(activeTab === "superadmin" ? "/superadmin" : "/admin");
        router.refresh();
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Back Link */}
      <Link
        href="/"
        className="absolute left-4 top-4 flex items-center gap-2 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <Card className="w-full max-w-md border-slate-700 bg-slate-800/50 backdrop-blur">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-white">Admin Portal</CardTitle>
          <CardDescription className="text-slate-400">
            Secure access for administrators
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Role Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "admin" | "superadmin")}
            className="mb-6"
          >
            <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
              <TabsTrigger
                value="admin"
                className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <UserCog className="h-4 w-4" />
                Admin
              </TabsTrigger>
              <TabsTrigger
                value="superadmin"
                className="gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                <Crown className="h-4 w-4" />
                Superadmin
              </TabsTrigger>
            </TabsList>

            <TabsContent value="admin" className="mt-4">
              <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3">
                <p className="text-sm text-blue-300">
                  Admin access allows you to manage courses, users, classes, and view analytics.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="superadmin" className="mt-4">
              <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-3">
                <p className="text-sm text-purple-300">
                  Superadmin access grants full system control including AI settings, API keys, and database management.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                <AlertTriangle className="h-4 w-4" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                {activeTab === "superadmin" ? "Superadmin Email" : "Admin Email"}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder={activeTab === "superadmin" ? "superadmin@example.com" : "admin@example.com"}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="border-slate-600 bg-slate-700/50 pl-10 text-white placeholder:text-slate-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="border-slate-600 bg-slate-700/50 pl-10 pr-10 text-white placeholder:text-slate-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full ${
                activeTab === "superadmin"
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  {activeTab === "superadmin" ? (
                    <Crown className="mr-2 h-4 w-4" />
                  ) : (
                    <UserCog className="mr-2 h-4 w-4" />
                  )}
                  Sign in as {activeTab === "superadmin" ? "Superadmin" : "Admin"}
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <h4 className="mb-2 text-sm font-medium text-slate-300">
              Security Notice
            </h4>
            <ul className="space-y-1 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Lock className="h-3 w-3" />
                All sessions are monitored and logged
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-3 w-3" />
                Access restricted to authorized personnel only
              </li>
            </ul>
          </div>

          <p className="mt-4 text-center text-sm text-slate-500">
            Looking for learner or trainer login?{" "}
            <Link href="/" className="text-primary hover:underline">
              Go to main site
            </Link>
          </p>
        </CardContent>
      </Card>

      <p className="mt-4 text-center text-xs text-slate-500">
        Protected by enterprise-grade security
      </p>
    </div>
  );
}
