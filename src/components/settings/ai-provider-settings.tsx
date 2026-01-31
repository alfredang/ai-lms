"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Save,
  Eye,
  EyeOff,
  RefreshCw,
  Sparkles,
  Check,
  AlertCircle,
} from "lucide-react";

// AI Provider configurations
const AI_PROVIDERS = {
  openai: {
    name: "OpenAI",
    icon: "🤖",
    baseUrl: "https://api.openai.com/v1",
    models: [
      { id: "gpt-4o", name: "GPT-4o", description: "Most capable model" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini", description: "Fast and affordable" },
      { id: "gpt-4-turbo", name: "GPT-4 Turbo", description: "High performance" },
      { id: "gpt-4", name: "GPT-4", description: "Original GPT-4" },
      { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fast responses" },
    ],
  },
  anthropic: {
    name: "Anthropic",
    icon: "🧠",
    baseUrl: "https://api.anthropic.com/v1",
    models: [
      { id: "claude-opus-4-5-20251101", name: "Claude Opus 4.5", description: "Most capable" },
      { id: "claude-sonnet-4-20250514", name: "Claude Sonnet 4", description: "Balanced" },
      { id: "claude-3-5-sonnet-20241022", name: "Claude 3.5 Sonnet", description: "Fast and capable" },
      { id: "claude-3-5-haiku-20241022", name: "Claude 3.5 Haiku", description: "Fastest" },
      { id: "claude-3-opus-20240229", name: "Claude 3 Opus", description: "Previous gen flagship" },
    ],
  },
  gemini: {
    name: "Google Gemini",
    icon: "✨",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    models: [
      { id: "gemini-2.0-flash-exp", name: "Gemini 2.0 Flash", description: "Latest experimental" },
      { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", description: "Most capable" },
      { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", description: "Fast responses" },
      { id: "gemini-1.5-flash-8b", name: "Gemini 1.5 Flash 8B", description: "Lightweight" },
      { id: "gemini-1.0-pro", name: "Gemini 1.0 Pro", description: "Stable" },
    ],
  },
  openrouter: {
    name: "OpenRouter",
    icon: "🔀",
    baseUrl: "https://openrouter.ai/api/v1",
    models: [
      { id: "anthropic/claude-3.5-sonnet", name: "Claude 3.5 Sonnet", description: "Via OpenRouter" },
      { id: "openai/gpt-4o", name: "GPT-4o", description: "Via OpenRouter" },
      { id: "google/gemini-pro-1.5", name: "Gemini 1.5 Pro", description: "Via OpenRouter" },
      { id: "meta-llama/llama-3.1-405b-instruct", name: "Llama 3.1 405B", description: "Open source" },
      { id: "mistralai/mistral-large", name: "Mistral Large", description: "European AI" },
    ],
  },
  deepseek: {
    name: "DeepSeek",
    icon: "🔍",
    baseUrl: "https://api.deepseek.com/v1",
    models: [
      { id: "deepseek-chat", name: "DeepSeek Chat", description: "General purpose" },
      { id: "deepseek-coder", name: "DeepSeek Coder", description: "Code specialist" },
      { id: "deepseek-reasoner", name: "DeepSeek Reasoner", description: "Complex reasoning" },
    ],
  },
};

type ProviderKey = keyof typeof AI_PROVIDERS;

interface AIProviderSettingsProps {
  currentProvider?: string;
  currentModel?: string;
  maxTokens?: number;
  temperature?: number;
}

export function AIProviderSettings({
  currentProvider = "openai",
  currentModel = "gpt-4o",
  maxTokens = 4096,
  temperature = 0.7,
}: AIProviderSettingsProps) {
  const [activeProvider, setActiveProvider] = useState<ProviderKey>(
    (currentProvider as ProviderKey) || "openai"
  );
  const [selectedModel, setSelectedModel] = useState(currentModel);
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({
    openai: "",
    anthropic: "",
    gemini: "",
    openrouter: "",
    deepseek: "",
  });
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [testStatus, setTestStatus] = useState<Record<string, "idle" | "testing" | "success" | "error">>({});
  const [maxTokensValue, setMaxTokensValue] = useState(maxTokens);
  const [temperatureValue, setTemperatureValue] = useState(temperature);

  const provider = AI_PROVIDERS[activeProvider];

  const handleTestConnection = async (providerKey: ProviderKey) => {
    setTestStatus((prev) => ({ ...prev, [providerKey]: "testing" }));

    // Simulate API test
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check if API key is provided
    if (apiKeys[providerKey]) {
      setTestStatus((prev) => ({ ...prev, [providerKey]: "success" }));
    } else {
      setTestStatus((prev) => ({ ...prev, [providerKey]: "error" }));
    }
  };

  const handleSave = async () => {
    // In a real implementation, this would save to the database
    console.log("Saving settings:", {
      provider: activeProvider,
      model: selectedModel,
      maxTokens: maxTokensValue,
      temperature: temperatureValue,
      apiKey: apiKeys[activeProvider],
    });
    alert("Settings saved! (Demo - would save to database)");
  };

  return (
    <div className="space-y-6">
      {/* Provider Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Provider Configuration
          </CardTitle>
          <CardDescription>
            Select and configure your preferred AI provider
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeProvider} onValueChange={(v) => setActiveProvider(v as ProviderKey)}>
            <TabsList className="grid w-full grid-cols-5">
              {Object.entries(AI_PROVIDERS).map(([key, prov]) => (
                <TabsTrigger key={key} value={key} className="text-xs">
                  <span className="mr-1">{prov.icon}</span>
                  <span className="hidden sm:inline">{prov.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(AI_PROVIDERS).map(([key, prov]) => (
              <TabsContent key={key} value={key} className="mt-6 space-y-6">
                {/* Provider Info */}
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{prov.icon}</span>
                    <div>
                      <h3 className="font-semibold">{prov.name}</h3>
                      <p className="text-sm text-muted-foreground">{prov.baseUrl}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {testStatus[key] === "success" && (
                      <Badge className="bg-green-500">
                        <Check className="mr-1 h-3 w-3" />
                        Connected
                      </Badge>
                    )}
                    {testStatus[key] === "error" && (
                      <Badge variant="destructive">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Failed
                      </Badge>
                    )}
                    {(!testStatus[key] || testStatus[key] === "idle") && (
                      <Badge variant="outline">Not Tested</Badge>
                    )}
                  </div>
                </div>

                {/* API Key */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">API Key</label>
                  <div className="flex gap-2">
                    <Input
                      type={showKeys[key] ? "text" : "password"}
                      placeholder={`Enter your ${prov.name} API key...`}
                      value={apiKeys[key]}
                      onChange={(e) =>
                        setApiKeys((prev) => ({ ...prev, [key]: e.target.value }))
                      }
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setShowKeys((prev) => ({ ...prev, [key]: !prev[key] }))
                      }
                    >
                      {showKeys[key] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleTestConnection(key as ProviderKey)}
                      disabled={testStatus[key] === "testing"}
                    >
                      {testStatus[key] === "testing" ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="mr-2 h-4 w-4" />
                      )}
                      Test
                    </Button>
                  </div>
                </div>

                {/* Model Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Model</label>
                  <Select
                    value={activeProvider === key ? selectedModel : prov.models[0].id}
                    onValueChange={setSelectedModel}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      {prov.models.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          <div className="flex items-center justify-between gap-4">
                            <span className="font-medium">{model.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {model.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Model Parameters */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Max Tokens</label>
                    <Input
                      type="number"
                      value={maxTokensValue}
                      onChange={(e) => setMaxTokensValue(Number(e.target.value))}
                      min={1}
                      max={128000}
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum response length (1-128,000)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Temperature</label>
                    <Input
                      type="number"
                      step="0.1"
                      value={temperatureValue}
                      onChange={(e) => setTemperatureValue(Number(e.target.value))}
                      min={0}
                      max={2}
                    />
                    <p className="text-xs text-muted-foreground">
                      Creativity level (0 = focused, 2 = creative)
                    </p>
                  </div>
                </div>

                {/* Custom Base URL (for OpenRouter-compatible endpoints) */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Base URL (Optional Override)</label>
                  <Input
                    placeholder={prov.baseUrl}
                    defaultValue=""
                  />
                  <p className="text-xs text-muted-foreground">
                    Override the default API endpoint for custom deployments
                  </p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Active Configuration Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Active Configuration</CardTitle>
          <CardDescription>
            Current AI settings that will be used platform-wide
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border p-4 text-center">
              <p className="text-sm text-muted-foreground">Provider</p>
              <p className="mt-1 font-semibold">
                {AI_PROVIDERS[activeProvider].icon} {AI_PROVIDERS[activeProvider].name}
              </p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-sm text-muted-foreground">Model</p>
              <p className="mt-1 font-semibold">{selectedModel}</p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-sm text-muted-foreground">Max Tokens</p>
              <p className="mt-1 font-semibold">{maxTokensValue.toLocaleString()}</p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-sm text-muted-foreground">Temperature</p>
              <p className="mt-1 font-semibold">{temperatureValue}</p>
            </div>
          </div>

          <Button onClick={handleSave} className="mt-6 w-full">
            <Save className="mr-2 h-4 w-4" />
            Save AI Configuration
          </Button>
        </CardContent>
      </Card>

      {/* Provider Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Provider Comparison</CardTitle>
          <CardDescription>
            Compare features across AI providers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-medium">Provider</th>
                  <th className="py-3 text-left font-medium">Best For</th>
                  <th className="py-3 text-left font-medium">Pricing</th>
                  <th className="py-3 text-left font-medium">Context Window</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">🤖 OpenAI</td>
                  <td className="py-3">General purpose, coding</td>
                  <td className="py-3">$2.50-15/M tokens</td>
                  <td className="py-3">128K tokens</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">🧠 Anthropic</td>
                  <td className="py-3">Long context, safety</td>
                  <td className="py-3">$3-15/M tokens</td>
                  <td className="py-3">200K tokens</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">✨ Google Gemini</td>
                  <td className="py-3">Multimodal, reasoning</td>
                  <td className="py-3">Free tier available</td>
                  <td className="py-3">1M tokens</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">🔀 OpenRouter</td>
                  <td className="py-3">Multiple models, flexibility</td>
                  <td className="py-3">Varies by model</td>
                  <td className="py-3">Varies</td>
                </tr>
                <tr>
                  <td className="py-3">🔍 DeepSeek</td>
                  <td className="py-3">Cost-effective, coding</td>
                  <td className="py-3">$0.14-1.10/M tokens</td>
                  <td className="py-3">64K tokens</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
