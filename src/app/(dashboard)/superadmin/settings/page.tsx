import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Settings,
  Bell,
  Shield,
  Database,
  Globe,
  Mail,
  Save,
} from "lucide-react";
import Link from "next/link";

async function getSystemSettings() {
  const aiSettings = await prisma.aISettings.findFirst({
    where: { isActive: true },
  });

  return { aiSettings };
}

export default async function SuperadminSettingsPage() {
  const session = await auth();
  if (!session?.user) return null;

  const { aiSettings } = await getSystemSettings();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/superadmin">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">
            Configure platform-wide settings
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>
              Basic platform configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform Name</label>
              <Input defaultValue="AI Learning Management System" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Support Email</label>
              <Input type="email" defaultValue="support@lms.example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform URL</label>
              <Input defaultValue="https://ai-lms-xi.vercel.app" />
            </div>
            <Button className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* AI Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              AI Configuration
            </CardTitle>
            <CardDescription>
              Configure AI assistant settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">AI Status</span>
              {aiSettings?.isActive ? (
                <Badge className="bg-green-500">Active</Badge>
              ) : (
                <Badge variant="secondary">Inactive</Badge>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">AI Model</label>
              <Input defaultValue={aiSettings?.model || "gpt-4o"} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Tokens</label>
              <Input type="number" defaultValue={aiSettings?.maxTokens || 4096} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Temperature</label>
              <Input type="number" step="0.1" defaultValue={aiSettings?.temperature || 0.7} />
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/superadmin/api-keys">
                Manage API Keys
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Settings
            </CardTitle>
            <CardDescription>
              Configure email notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">SMTP Host</label>
              <Input placeholder="smtp.example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">SMTP Port</label>
              <Input type="number" defaultValue="587" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">From Address</label>
              <Input type="email" placeholder="noreply@lms.example.com" />
            </div>
            <Button className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Email Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Platform security configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">
                  Require 2FA for admin users
                </p>
              </div>
              <Badge variant="outline">Optional</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Session Timeout</p>
                <p className="text-xs text-muted-foreground">
                  Auto logout after inactivity
                </p>
              </div>
              <span className="text-sm">30 minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Password Policy</p>
                <p className="text-xs text-muted-foreground">
                  Minimum password requirements
                </p>
              </div>
              <Badge>Strong</Badge>
            </div>
            <Button variant="outline" className="w-full">
              <Shield className="mr-2 h-4 w-4" />
              Security Audit Log
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure system notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">New User Signup</p>
                <p className="text-xs text-muted-foreground">
                  Notify admins of new registrations
                </p>
              </div>
              <Badge className="bg-green-500">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Course Completion</p>
                <p className="text-xs text-muted-foreground">
                  Notify when learners complete courses
                </p>
              </div>
              <Badge className="bg-green-500">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Assignment Submissions</p>
                <p className="text-xs text-muted-foreground">
                  Notify trainers of new submissions
                </p>
              </div>
              <Badge className="bg-green-500">Enabled</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database
            </CardTitle>
            <CardDescription>
              Database management and backups
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Provider</span>
              <Badge>Neon PostgreSQL</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <Badge className="bg-green-500">Connected</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last Backup</span>
              <span className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/superadmin/database">
                <Database className="mr-2 h-4 w-4" />
                Database Management
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
