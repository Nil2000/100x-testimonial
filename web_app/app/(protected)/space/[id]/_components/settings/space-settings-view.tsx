"use client";
import { useSpaceStore } from "@/store/spaceStore";
import React from "react";
import PublishSpaceSwitch from "../space-settings-controls/publish-space-switch";
import AnalysisSwitch from "../space-settings-controls/analysis-switch";
import DeleteSpaceDialog from "../space-settings-controls/delete-space-dialog";
import { deleteSpace } from "@/actions/spaceActions";
import { useRouter } from "next/navigation";
import { Globe, Brain, AlertTriangle } from "lucide-react";

export default function SpaceControlView() {
  const { spaceInfo } = useSpaceStore();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteSpace(spaceInfo.id);
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to delete space:", error);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Visibility Section */}
      <div className="rounded-lg border bg-card">
        <div className="flex items-start gap-4 p-4">
          <div className="rounded-lg bg-primary/10 p-2.5">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-medium">Space Visibility</h3>
            <p className="text-sm text-muted-foreground">
              Control whether your testimonial collection form is publicly
              accessible.
            </p>
          </div>
          <PublishSpaceSwitch />
        </div>
      </div>

      {/* AI Analysis Section */}
      <div className="rounded-lg border bg-card">
        <div className="flex items-start gap-4 p-4">
          <div className="rounded-lg bg-violet-500/10 p-2.5">
            <Brain className="h-5 w-5 text-violet-500" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-medium">AI Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Enable AI-powered sentiment analysis and insights for your
              testimonials.
            </p>
          </div>
          <AnalysisSwitch />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-lg border border-destructive/30 bg-destructive/5">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h3 className="font-medium text-destructive">Danger Zone</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Permanently delete this space and all its testimonials. This action
            cannot be undone.
          </p>
          <DeleteSpaceDialog handleDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
