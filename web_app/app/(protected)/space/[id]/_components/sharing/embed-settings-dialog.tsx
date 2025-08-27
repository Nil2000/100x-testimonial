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

type EmbedSettingsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  testimonial: TestimonialResponse;
};

export default function EmbedSettingsDialog({
  isOpen,
  onClose,
  testimonial,
}: EmbedSettingsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="font-sans max-h-[calc(100vh-2rem)] overflow-y-auto max-w-3xl overflow-x-hidden p-6">
        <DialogHeader className="max-w-[48rem]">
          <DialogTitle>Embed Settings Dialog</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
