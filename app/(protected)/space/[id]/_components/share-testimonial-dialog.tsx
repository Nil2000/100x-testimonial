"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TestimonialResponse } from "@/lib/types";
import React from "react";

type ShareTestimonialDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  feddabackInfo: TestimonialResponse;
};

export default function ShareTestimonialDialog({
  isOpen,
  onClose,
  feddabackInfo,
}: ShareTestimonialDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="font-sans">
        <DialogHeader hidden>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <p>Share this testimonial with your friends and family</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
