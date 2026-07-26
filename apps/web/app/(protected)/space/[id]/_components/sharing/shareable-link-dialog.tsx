import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy, Link2, Check } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  testimonialId: string;
  spaceName: string;
};

export default function ShareableLinkDialog({
  isOpen,
  onClose,
  testimonialId,
  spaceName,
}: Props) {
  const [copied, setCopied] = React.useState(false);
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/${spaceName}/testimonial/${testimonialId}`;

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
        toast.error("Failed to copy link. Please try again.");
      });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="font-sans sm:max-w-md">
        <DialogHeader className="space-y-3">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Link2 className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">
            Share Testimonial
          </DialogTitle>
          <DialogDescription className="text-center">
            Anyone with this link can view this testimonial
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="relative">
            <div className="font-mono text-xs text-foreground/80 bg-muted/50 border-2 border-border rounded-lg p-3 pr-12 break-all max-w-full">
              {link}
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-1 top-1 h-8 w-8 p-0"
              onClick={handleCopyLink}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <DialogFooter className="sm:justify-center gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 sm:flex-none"
          >
            Close
          </Button>
          <Button
            onClick={handleCopyLink}
            className="flex-1 sm:flex-none"
            disabled={copied}
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
