"use client";
import React from "react";
import { useSpaceStore } from "@/store/spaceStore";
import { usePlanStore } from "@/store/planStore";
import { saveWallOfLoveSettings } from "@/actions/spaceActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  normalizeWallOfLoveSettings,
  isWallOfLovePristine,
  type WallOfLoveCount,
  type WallOfLoveSettings,
} from "@/lib/wall-of-love-settings";
import type { WallOfLoveLayout } from "@/lib/constants";
import { PlanType, PLAN_LIMITS } from "@/lib/subscription";
import WallOfLoveLayoutPicker from "./wall-of-love-layout-picker";
import WallOfLoveChromeOptions from "./wall-of-love-chrome-options";
import WallOfLovePreview from "./wall-of-love-preview";

export default function WallOfLovePage() {
  const { spaceInfo, updateWallOfLoveSettings } = useSpaceStore();
  const { subscription } = usePlanStore();

  const plan = (subscription?.plan as unknown as PlanType) ?? PlanType.FREE;
  const canCustomBrand = PLAN_LIMITS[plan]?.customBranding ?? false;

  const savedSettings = React.useMemo(
    () => normalizeWallOfLoveSettings(spaceInfo.theme),
    [spaceInfo.theme],
  );

  const [draft, setDraft] = React.useState<WallOfLoveSettings>(savedSettings);
  const [isSaving, setIsSaving] = React.useState(false);

  const isPristine = isWallOfLovePristine(draft, savedSettings);

  const handleStyleChange = (style: WallOfLoveLayout["value"]) => {
    setDraft((prev) => ({
      ...prev,
      style,
      styleOptions: {
        showRating: prev.styleOptions.showRating,
        ...(style === "infiniteScrollHorizontal"
          ? { rows: "1" }
          : { columns: style === "carousel" ? "2" : "3" }),
      },
    }));
  };

  const handleCountChange = (value: WallOfLoveCount) => {
    setDraft((prev) => ({
      ...prev,
      styleOptions: {
        ...prev.styleOptions,
        [prev.style === "infiniteScrollHorizontal" ? "rows" : "columns"]: value,
      },
    }));
  };

  const handleShowRatingChange = (checked: boolean) => {
    setDraft((prev) => ({
      ...prev,
      styleOptions: { ...prev.styleOptions, showRating: checked ? "true" : "false" },
    }));
  };

  const saveSettings = async () => {
    if (!spaceInfo.id) return;

    setIsSaving(true);
    try {
      const result = await saveWallOfLoveSettings(spaceInfo.id, draft);

      if (result.error) {
        console.error("Failed to save settings:", result.error);
        toast.error(result.error);
      } else {
        updateWallOfLoveSettings(draft);
        toast.success("Wall of love settings saved!");
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <WallOfLoveLayoutPicker
          selectedStyle={draft.style}
          styleOptions={draft.styleOptions}
          onStyleChange={handleStyleChange}
          onCountChange={handleCountChange}
          onShowRatingChange={handleShowRatingChange}
          disabled={isSaving}
        />

        <Separator />

        <WallOfLoveChromeOptions
          spaceName={spaceInfo.name}
          headline={draft.headline ?? ""}
          subtitle={draft.subtitle ?? ""}
          onHeadlineChange={(headline) =>
            setDraft((prev) => ({ ...prev, headline }))
          }
          onSubtitleChange={(subtitle) =>
            setDraft((prev) => ({ ...prev, subtitle }))
          }
          hideBranding={Boolean(draft.hideBranding)}
          onHideBrandingChange={(hideBranding) =>
            setDraft((prev) => ({ ...prev, hideBranding }))
          }
          canCustomBrand={canCustomBrand}
          disabled={isSaving}
        />

        <Separator />

        <div className="flex justify-end">
          <Button onClick={saveSettings} disabled={isSaving || isPristine} size="lg">
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <WallOfLovePreview spaceId={spaceInfo.id} settings={draft} />
        </CardContent>
      </Card>
    </div>
  );
}
