"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap } from "lucide-react";
import Link from "next/link";

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  feature?: string;
  currentUsage?: number;
  limit?: number;
}

export default function UpgradeDialog({
  open,
  onOpenChange,
  title = "Upgrade Required",
  description,
  feature = "this feature",
  currentUsage,
  limit,
}: UpgradeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description ||
              `You've reached the limit for ${feature} on your current plan.`}
          </DialogDescription>
        </DialogHeader>

        {currentUsage !== undefined && limit !== undefined && (
          <div className="py-4">
            <div className="bg-muted rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">
                Current Usage
              </p>
              <p className="text-2xl font-bold">
                {currentUsage} / {limit}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg p-4 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">
                  Start Your Free Trial
                </h4>
                <p className="text-xs text-muted-foreground">
                  Get 7 days of Professional features including 3 spaces, AI
                  analysis, and more.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link href="/buy-premium" className="w-full">
          <Button className="w-full" size="lg">
            View Plans & Start Trial
          </Button>
        </Link>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          className="w-full"
        >
          Maybe Later
        </Button>
      </DialogContent>
    </Dialog>
  );
}
