"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, Send } from "lucide-react";

interface AssignmentSubmissionFormProps {
  assignmentId: string;
  enrollmentId: string;
}

export function AssignmentSubmissionForm({
  assignmentId,
  enrollmentId,
}: AssignmentSubmissionFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/assignments/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assignmentId,
          enrollmentId,
          content,
          fileUrl: fileUrl || undefined,
        }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to submit assignment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label htmlFor="content" className="text-sm font-medium">
          Your Answer
        </label>
        <Textarea
          id="content"
          placeholder="Type your answer here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="mt-2"
          required
        />
      </div>

      <div>
        <label htmlFor="fileUrl" className="text-sm font-medium">
          Attachment URL (optional)
        </label>
        <div className="mt-2 flex gap-2">
          <Input
            id="fileUrl"
            type="url"
            placeholder="https://example.com/your-file.pdf"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
          />
          <Button type="button" variant="outline" size="icon" disabled>
            <Upload className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Paste a link to your file or document
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading || !content.trim()}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Submit Assignment
          </>
        )}
      </Button>
    </form>
  );
}
