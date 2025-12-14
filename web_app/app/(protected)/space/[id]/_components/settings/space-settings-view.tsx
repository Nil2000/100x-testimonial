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
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Visibility Section */}
        <div className="rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4 p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-lg">Space Visibility</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Control whether your testimonial collection form is publicly
                accessible. When published, anyone with the link can submit
                testimonials.
              </p>
            </div>
            <div className="flex-shrink-0">
              <PublishSpaceSwitch />
            </div>
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4 p-6">
            <div className="rounded-lg bg-violet-500/10 p-3">
              <Brain className="h-5 w-5 text-violet-500" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">AI Analysis</h3>
                <span className="text-xs bg-violet-500/10 text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded-full font-medium">
                  Beta
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enable AI-powered sentiment analysis and insights for your
                testimonials. Get automated feedback categorization and
                emotional tone detection.
              </p>
            </div>
            <div className="flex-shrink-0">
              <AnalysisSwitch />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-lg border-2 border-destructive/30 bg-destructive/5 shadow-sm">
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-destructive/10 p-2.5">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-lg text-destructive">
                  Danger Zone
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Permanently delete this space and all its testimonials. This
                  action cannot be undone and all data will be lost forever.
                </p>
              </div>
            </div>
            <div className="pt-2">
              <DeleteSpaceDialog handleDelete={handleDelete} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
