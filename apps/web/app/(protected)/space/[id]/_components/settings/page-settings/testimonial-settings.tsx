"use client";

import React from "react";
import { toast } from "sonner";
import { cx } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { useFont } from "@/hooks/useFont";
import { useSpaceStore } from "@/store/spaceStore";
import { usePlanStore } from "@/store/planStore";
import { updateThemeForSpace } from "@/actions/themeActions";
import { Theme, THEME_CHOICES } from "@/components/theme-constant";
import { PlanType, PLAN_LIMITS } from "@/lib/subscription";
import { isThemePristine } from "@/lib/theme-settings";
import CollectionPageView from "@/components/collection-page/collection-page-view";
import ThemePicker from "./theme-picker";
import BrandingOptions from "./branding-options";

export default function TestimonialPage() {
  const { spaceInfo, updateThemeField } = useSpaceStore();
  const { subscription } = usePlanStore();
  const { fontSelected, handleFontSelect, fontList } = useFont();

  // usePlanStore's PlanType (from @repo/db/enums) and lib/subscription's PlanType
  // are distinct nominal types with the same string members; cast the same way
  // accessControl.ts does when bridging the two.
  const plan = (subscription?.plan as unknown as PlanType) ?? PlanType.FREE;
  const canCustomBrand = PLAN_LIMITS[plan]?.customBranding ?? false;

  const [theme, setTheme] = React.useState<Theme | null>(
    THEME_CHOICES.find((t) => t.value === spaceInfo.theme.theme) || null,
  );
  const [showBrandLogo, setShowBrandLogo] = React.useState(
    Boolean(spaceInfo.theme.themeOptions?.showBrandLogo),
  );
  const [isSaving, setIsSaving] = React.useState(false);
  const noTheme = !theme;

  React.useEffect(() => {
    // Always load the font from theme options if available, regardless of theme selection
    if (spaceInfo.theme.themeOptions?.font) {
      handleFontSelect(spaceInfo.theme.themeOptions.font);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isPristine = isThemePristine(
    { theme: theme?.value ?? null, showBrandLogo, font: fontSelected },
    {
      theme: spaceInfo.theme.theme,
      showBrandLogo: Boolean(spaceInfo.theme.themeOptions?.showBrandLogo),
      font: spaceInfo.theme.themeOptions?.font ?? null,
    },
  );

  const handleThemeSelect = (nextTheme: Theme) => {
    setTheme(nextTheme);
    if (canCustomBrand) {
      // A theme's default font is part of what selecting it promises; without
      // this the "Font Family" label on each card is decorative only.
      handleFontSelect(nextTheme.defaultFont);
    }
  };

  const submitTheme = async () => {
    const themeOptions = { showBrandLogo, font: fontSelected };

    setIsSaving(true);
    const result = await updateThemeForSpace({
      theme: noTheme ? null : theme!.value,
      themeOptions,
      spaceId: spaceInfo?.id,
    });
    setIsSaving(false);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    updateThemeField("theme", noTheme ? null : theme!.value);
    updateThemeField("themeOptions", themeOptions);
    toast.success("Theme settings saved");
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Settings Section */}
      <div className="space-y-6">
        <BrandingOptions
          noTheme={noTheme}
          onNoThemeChange={(checked) =>
            setTheme(checked ? null : THEME_CHOICES[0])
          }
          showBrandLogo={showBrandLogo}
          onShowBrandLogoChange={setShowBrandLogo}
          canCustomBrand={canCustomBrand}
          font={fontSelected}
          onFontChange={handleFontSelect}
          fontList={fontList}
        />

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">
            Appearance
          </h3>
          <ThemePicker
            selectedValue={theme?.value ?? null}
            noTheme={noTheme}
            canCustomBrand={canCustomBrand}
            onSelect={handleThemeSelect}
          />
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            className="px-6"
            disabled={isSaving || isPristine}
            onClick={submitTheme}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
          {!isPristine && !isSaving && (
            <span className="text-xs text-muted-foreground">
              You have unsaved changes
            </span>
          )}
        </div>
      </div>

      {/* Preview Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Live Preview
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Real-time preview of your testimonial collection page
            </p>
          </div>
          {theme && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border">
              <span className="text-lg">{theme.icon}</span>
              <span className="text-xs font-medium">{theme.label}</span>
            </div>
          )}
        </div>

        <div className="rounded-xl overflow-hidden border-2 shadow-lg">
          <CollectionPageView
            headerTitle={spaceInfo?.headerTitle || "We Value Your Feedback"}
            headerSubtitle={
              spaceInfo?.headerSubtitle ||
              "Help us improve by sharing your experience"
            }
            logo={spaceInfo?.logo || null}
            showBrandLogo={showBrandLogo}
            questions={spaceInfo.questions}
            collectionType={spaceInfo.collectionType}
            theme={theme ?? undefined}
            fontFamily={`'${fontSelected}', ${
              fontList.find((f) => f.family === fontSelected)?.category ||
              "sans-serif"
            }`}
            navbarBadge={
              <div
                className={cx(
                  "text-xs px-2 py-1 rounded-md font-medium",
                  theme?.type === "dark"
                    ? "bg-white/10 text-white/70"
                    : "bg-black/5 text-black/60",
                )}
              >
                Preview Mode
              </div>
            }
            wrapperClassName="min-h-[500px]"
            contentClassName="min-h-[400px]"
          />
        </div>
      </div>
    </div>
  );
}
