import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Import, Loader2 } from "lucide-react";
import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { SOCIAL_PLATFORM } from "@/lib/types";

interface ImportSocialDialogResult {
  type: "success" | "error" | "cancel";
  data?: any;
  error?: string;
}

interface ImportSocialDialogProps {
  isOpen: boolean;
  onClose: (result: ImportSocialDialogResult) => void;
  platform: SOCIAL_PLATFORM; // e.g., "X", "LinkedIn"
  spaceId: string;
}

export default function ImportSocialDialog({
  isOpen,
  onClose,
  platform,
  spaceId,
}: ImportSocialDialogProps) {
  const [importing, setImporting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [postUrl, setPostUrl] = useState("");

  const extractTweetId = (url: string): string | null => {
    const tweetIdMatch = url.match(/status\/(\d+)/);
    return tweetIdMatch ? tweetIdMatch[1] : null;
  };

  const resetForm = () => {
    setPostUrl("");
    setStatus(null);
    setImporting(false);
  };

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleImport = async () => {
    setImporting(true);
    setStatus(null);

    try {
      const tweetId = extractTweetId(postUrl);
      if (!tweetId) {
        toast.error("Invalid post URL. Please use a valid Twitter/X post URL.");
        setImporting(false);
        return;
      }

      const response = await axios.post(`/api/lookuptweetById`, {
        tweetId,
        spaceId,
      });
      const apiResponse = response.data;

      if (!apiResponse.success) {
        toast.error(apiResponse.error || "Failed to import tweet.");
        setImporting(false);
        return;
      }

      // The API now returns the saved feedback data
      const savedFeedback = apiResponse.data;

      setImporting(false);
      toast.success(apiResponse.message || "Tweet imported successfully!");
      onClose({ type: "success", data: savedFeedback });

      console.log(savedFeedback.metadata);
    } catch (error) {
      console.error("Error importing tweet:", error);
      const errorMessage = "Failed to import tweet. Please try again.";
      toast.error(errorMessage);
      setImporting(false);
      onClose({ type: "error", error: errorMessage });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose({ type: "cancel" });
        }
      }}
    >
      <DialogContent className="font-sans">
        <DialogHeader>
          <DialogTitle>Import from {platform}</DialogTitle>
          <DialogDescription>
            Import testimonials or posts from your {platform} account.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Enter post URL"
          value={postUrl}
          onChange={(e) => setPostUrl(e.target.value)}
        />
        {status && (
          <div
            className={`text-sm font-medium ${
              status.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {status}
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          The tweet link should follow this format:
          <br />
          https://twitter.com/username/status/tweet-id
        </p>
        <DialogFooter>
          <Button
            variant="default"
            onClick={handleImport}
            disabled={importing || !postUrl.trim()}
          >
            {importing ? (
              <Loader2 className="mr-2 opacity-60 animate-spin" size={16} />
            ) : (
              <>
                <Import className="mr-2 opacity-60" size={16} />
                Import
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
