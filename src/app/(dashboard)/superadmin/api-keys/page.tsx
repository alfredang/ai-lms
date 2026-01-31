import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Key,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  Copy,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

async function getAISettings() {
  const settings = await prisma.aISettings.findMany({
    orderBy: { createdAt: "desc" },
  });
  return settings;
}

export default async function APIKeysPage() {
  const session = await auth();
  if (!session?.user) return null;

  const aiSettings = await getAISettings();

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
          <h1 className="text-3xl font-bold">API Keys</h1>
          <p className="text-muted-foreground">
            Manage API keys for AI and external services
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add API Key
        </Button>
      </div>

      {/* OpenAI Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            OpenAI Configuration
          </CardTitle>
          <CardDescription>
            Configure the OpenAI API for AI-powered features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  placeholder="sk-..."
                  defaultValue="sk-********************************"
                />
                <Button variant="outline" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Base URL (Optional)</label>
              <Input placeholder="https://api.openai.com/v1" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Model</label>
              <Input defaultValue="gpt-4o" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Tokens</label>
              <Input type="number" defaultValue="4096" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Temperature</label>
              <Input type="number" step="0.1" defaultValue="0.7" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Connection Status</p>
              <p className="text-sm text-muted-foreground">
                Last tested: {new Date().toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500">Connected</Badge>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Test Connection
              </Button>
            </div>
          </div>

          <Button className="w-full">
            Save OpenAI Configuration
          </Button>
        </CardContent>
      </Card>

      {/* Other API Keys */}
      <Card>
        <CardHeader>
          <CardTitle>External Service Keys</CardTitle>
          <CardDescription>
            API keys for third-party integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Vercel Blob */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Key className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Vercel Blob Storage</p>
                  <p className="text-sm text-muted-foreground">
                    File uploads and storage
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500">Configured</Badge>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>

            {/* Resend Email */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Key className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Resend Email</p>
                  <p className="text-sm text-muted-foreground">
                    Transactional emails
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Not Configured</Badge>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>

            {/* Google OAuth */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Key className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Google OAuth</p>
                  <p className="text-sm text-muted-foreground">
                    Google sign-in authentication
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500">Configured</Badge>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>

            {/* GitHub OAuth */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Key className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">GitHub OAuth</p>
                  <p className="text-sm text-muted-foreground">
                    GitHub sign-in authentication
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500">Configured</Badge>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Key History */}
      <Card>
        <CardHeader>
          <CardTitle>AI Settings History</CardTitle>
          <CardDescription>
            Previously configured AI settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {aiSettings.length > 0 ? (
            <div className="space-y-2">
              {aiSettings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{setting.provider}</p>
                    <p className="text-sm text-muted-foreground">
                      Model: {setting.model} | Created: {new Date(setting.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {setting.isActive ? (
                      <Badge className="bg-green-500">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <Key className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">
                No AI settings configured yet
              </p>
              <Button className="mt-4" variant="outline">
                Configure AI Settings
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
