"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TestimonialResponse } from "@/lib/types";

type EmbedShareDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  testimonial: TestimonialResponse;
};

export default function EmbedShareDialog({
  isOpen,
  onClose,
  testimonial,
}: EmbedShareDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="font-sans max-h-[calc(100vh-2rem)] overflow-y-auto max-w-3xl overflow-x-hidden p-6">
        <DialogHeader className="max-w-[48rem]">
          <DialogTitle>Embed Share Dialog</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
