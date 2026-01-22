import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useFont } from "@/hooks/useFont";
import { useSpaceStore } from "@/store/spaceStore";
import Image from "next/image";
import { cx } from "class-variance-authority";
import { updateThemeForSpace } from "@/actions/themeActions";
import { Theme, THEME_CHOICES } from "@/components/theme-constant";
import { Video, Pen } from "lucide-react";
import { usePlanStore } from "@/store/planStore";
import ThemeOptionCard from "./theme-option-card";

export default function TestimonialPage() {
  const { spaceInfo, updateThemeField } = useSpaceStore();
  const { subscription } = usePlanStore();
  const { fontSelected, handleFontSelect, fontList } = useFont();
  const isFreePlan = (subscription?.plan ?? "FREE") === "FREE";
  const effectiveFont = fontSelected;
  const [theme, setTheme] = React.useState<Theme | null>(
    THEME_CHOICES.find((t) => t.value === spaceInfo.theme.theme) || null
  );
  const [showBrandLogo, setShowBrandLogo] = React.useState(
    spaceInfo.theme.themeOptions.showBrandLogo
  );
  const [isPending, startTransition] = React.useTransition();
  const noTheme = !theme;
  const freeThemeChoices = React.useMemo(() => {
    const lightTheme = THEME_CHOICES.find((t) => t.type === "light");
    const darkTheme = THEME_CHOICES.find((t) => t.type === "dark");
    return [lightTheme, darkTheme].filter(Boolean) as Theme[];
  }, []);
  const availableThemes = THEME_CHOICES;
  const submitTheme = async () => {
    // Always include font in theme options regardless of theme selection
    const themeOptions = {
      showBrandLogo: isFreePlan ? false : showBrandLogo,
      font: effectiveFont,
    };

    const selectedTheme = isFreePlan
      ? theme && freeThemeChoices.find((t) => t.value === theme.value)
      : theme;

    if (noTheme) {
      startTransition(async () => {
        await updateThemeForSpace({
          theme: null,
          themeOptions,
          spaceId: spaceInfo?.id,
        });

        updateThemeField("theme", null);
        updateThemeField("themeOptions", themeOptions);
      });
      return;
    }

    startTransition(async () => {
      await updateThemeForSpace({
        theme: selectedTheme?.value ?? null,
        themeOptions,
        spaceId: spaceInfo?.id,
      });

      updateThemeField("theme", selectedTheme?.value ?? null);
      updateThemeField("themeOptions", themeOptions);
    });
  };

  React.useEffect(() => {
    // Always load the font from theme options if available, regardless of theme selection
    if (spaceInfo.theme.themeOptions.font) {
      handleFontSelect(spaceInfo.theme.themeOptions.font);
    }
  }, []);

  React.useEffect(() => {
    if (!isFreePlan) return;
    if (showBrandLogo) {
      setShowBrandLogo(false);
    }
    if (theme && !freeThemeChoices.some((t) => t.value === theme.value)) {
      setTheme(freeThemeChoices[0] ?? null);
    }
  }, [isFreePlan, showBrandLogo, theme, availableThemes]);

  const checkDiff = () => {
    return (
      theme?.value === spaceInfo.theme.theme &&
      showBrandLogo === spaceInfo.theme.themeOptions.showBrandLogo &&
      effectiveFont === spaceInfo.theme.themeOptions.font
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Settings Section */}
      <div className="space-y-6">
        {/* Theme Options Group */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Theme Options
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                <div className="space-y-0.5">
                  <label
                    htmlFor="theme-switch"
                    className="font-medium text-sm cursor-pointer"
                  >
                    No Theme
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Use default styling without a theme
                  </p>
                </div>
                <Switch
                  id="theme-switch"
                  checked={noTheme}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setTheme(null);
                    } else {
                      setTheme(THEME_CHOICES[0]);
                    }
                  }}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                <div className="space-y-0.5">
                  <label
                    htmlFor="brand-logo-switch"
                    className="font-medium text-sm cursor-pointer"
                  >
                    Show Brand Logo
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Display your logo on the page
                  </p>
                </div>
                <Switch
                  id="brand-logo-switch"
                  checked={showBrandLogo}
                  onCheckedChange={setShowBrandLogo}
                  disabled={isFreePlan}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Appearance Group */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Appearance</h3>
          <div className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Theme Style
                </label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Choose a pre-designed theme style
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2">
                {availableThemes.map((themeOption) => {
                  const isSelected = theme?.value === themeOption.value;
                  const isThemeLocked =
                    isFreePlan &&
                    !freeThemeChoices.some((t) => t.value === themeOption.value);
                  return (
                    <ThemeOptionCard
                      key={themeOption.value}
                      themeOption={themeOption}
                      isSelected={isSelected}
                      isDisabled={noTheme || isThemeLocked}
                      onSelect={() => {
                        if (isThemeLocked) return;
                        setTheme(themeOption);
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="font-select"
                  className="text-sm font-medium text-foreground"
                >
                  Font Family
                </label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select the typography for your page
                </p>
              </div>
              <Select
                value={effectiveFont}
                onValueChange={(font) => {
                  if (isFreePlan) return;
                  handleFontSelect(font);
                }}
                disabled={isFreePlan}
              >
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent className="font-sans max-h-72 overflow-y-auto">
                  {fontList.map((font) => (
                    <SelectItem key={font.family} value={font.family}>
                      {font.family}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            className="px-6"
            disabled={isPending || checkDiff()}
            onClick={submitTheme}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
          {!checkDiff() && !isPending && (
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
          {!noTheme && theme && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border">
              <span className="text-lg">{theme.icon}</span>
              <span className="text-xs font-medium">{theme.label}</span>
            </div>
          )}
        </div>

        <div
          className={cx(
            "rounded-xl overflow-hidden min-h-[500px] transition-all duration-300 border-2 shadow-lg",
            !noTheme && theme?.bg
              ? theme.bg
              : "bg-gradient-to-br from-background to-muted/20"
          )}
        >
          {/* Preview Navbar */}
          <nav
            className={cx(
              "w-full px-6 md:px-8 py-4 border-b flex items-center justify-between backdrop-blur-sm",
              !noTheme && theme?.type === "dark"
                ? "border-white/10 bg-black/20"
                : "border-black/10 bg-white/20"
            )}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Image src="/logo.svg" alt="Logo" width={20} height={20} />
              </div>
              <h2
                className={cx(
                  "font-poppins font-semibold text-lg md:text-xl",
                  !noTheme && theme?.type === "dark"
                    ? "text-white"
                    : !noTheme && theme?.type === "light"
                    ? "text-black"
                    : "text-foreground"
                )}
              >
                100xTestimonials
              </h2>
            </div>
            <div
              className={cx(
                "text-xs px-2 py-1 rounded-md font-medium",
                !noTheme && theme?.type === "dark"
                  ? "bg-white/10 text-white/70"
                  : "bg-black/5 text-black/60"
              )}
            >
              Preview Mode
            </div>
          </nav>

          {/* Preview Container */}
          <div className="flex justify-center items-center min-h-[400px] py-10 md:py-14 px-4 relative">
            {/* Decorative Elements */}
            {!noTheme && theme && (
              <>
                <div
                  className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-20 blur-2xl"
                  style={{ background: theme.colorPalette[0] }}
                />
                <div
                  className="absolute bottom-10 right-10 w-32 h-32 rounded-full opacity-20 blur-3xl"
                  style={{ background: theme.colorPalette[1] }}
                />
              </>
            )}

            <div
              className={cx(
                "rounded-xl p-6 md:p-8 w-full max-w-lg flex flex-col gap-4 backdrop-blur-sm relative z-10 transition-all duration-300",
                !noTheme && theme
                  ? `${theme.textClass} ${theme.border} ${theme.shadow} ${theme.alignment}`
                  : "text-center border-2 bg-card/80 shadow-md"
              )}
              style={{
                fontFamily: `'${effectiveFont}', ${
                  fontList.find((f) => f.family === effectiveFont)?.category ||
                  "sans-serif"
                }`,
                background:
                  !noTheme && theme ? theme.mainContainerBg : undefined,
              }}
            >
              {showBrandLogo && (
                <div className="flex justify-center mb-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden ring-2 ring-offset-2 ring-primary/20 shadow-md">
                    <Image
                      src={spaceInfo?.logo || "/logo.svg"}
                      alt="Brand Logo"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              <div className="space-y-3">
                <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                  {spaceInfo?.headerTitle || "We Value Your Feedback"}
                </h1>
                <p
                  className={cx(
                    "text-sm md:text-base font-medium leading-relaxed",
                    noTheme ? "text-muted-foreground" : "opacity-80"
                  )}
                >
                  {spaceInfo?.headerSubtitle ||
                    "Help us improve by sharing your experience"}
                </p>
              </div>
              <div className="space-y-3 mt-2">
                <div
                  className={cx(
                    "inline-block px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider",
                    !noTheme && theme?.type === "dark"
                      ? "bg-white/10"
                      : "bg-black/5"
                  )}
                >
                  Questions
                </div>
                <ul
                  className={cx(
                    "space-y-2 text-sm pl-5",
                    !noTheme && theme ? theme.listStyle : "list-disc",
                    !noTheme && theme ? theme.alignment : "text-left"
                  )}
                  style={{
                    listStyleType: theme?.listStyle.includes("none")
                      ? "none"
                      : undefined,
                  }}
                >
                  <li className="leading-relaxed">
                    How satisfied are you with our service?
                  </li>
                  <li className="leading-relaxed">
                    What did you like the most about your experience?
                  </li>
                  <li className="leading-relaxed">
                    Any suggestions for improvement?
                  </li>
                </ul>
              </div>
              <div className="flex gap-3 mt-6 flex-col sm:flex-row justify-center">
                <Button
                  type="button"
                  size="default"
                  className={cx(
                    "flex-1 sm:flex-none gap-2 font-medium shadow-sm",
                    !noTheme && theme
                      ? `${theme.primaryButtonColor} text-white`
                      : ""
                  )}
                >
                  <Video className="w-4 h-4" />
                  Record Video
                </Button>
                <Button
                  type="button"
                  size="default"
                  className={cx(
                    "flex-1 sm:flex-none gap-2 font-medium shadow-sm",
                    !noTheme && theme ? theme.secondaryButtonColor : ""
                  )}
                  variant={noTheme ? "secondary" : "default"}
                >
                  <Pen className="w-4 h-4" />
                  Write Text
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}