import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy } from "lucide-react";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  testimonialId: string;
  spaceName: string;
};

export default function GetLinkDialog({
  isOpen,
  onClose,
  testimonialId,
  spaceName,
}: Props) {
  const handleCopyLink = () => {
    const link = `${process.env.NEXT_PUBLIC_BASE_URL}/${spaceName}/testimonial/${testimonialId}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log("Link copied to clipboard:", link);
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
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
      <DialogContent className="font-sans">
        <DialogHeader>
          <DialogTitle>Get Link</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div
          className="font-mono
          text-sm text-muted-foreground mb-4
          bg-muted-foreground/10
          border border-muted-foreground/20
          p-2 rounded-md
        "
        >{`${process.env.NEXT_PUBLIC_BASE_URL}/${spaceName}/testimonial/${testimonialId}`}</div>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => {
              onClose();
              handleCopyLink();
            }}
          >
            <Copy className="mr-2 opacity-60" size={16} />
            Copy link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
