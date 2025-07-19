import React, { startTransition } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useFont } from "@/hooks/use-font";
import { useSpaceStore } from "@/store/spaceStore";
import Image from "next/image";
import clsx from "clsx";
import { cx } from "class-variance-authority";
import { updateThemeForSpace } from "@/actions/themeActions";
import { Theme, THEME_CHOICES } from "@/components/theme-constant";

export default function TestimonialPage() {
  const { spaceInfo, updateThemeField } = useSpaceStore();
  const { fontSelected, handleFontSelect, fontList } = useFont();
  const effectiveFont = fontSelected;
  const [theme, setTheme] = React.useState<Theme | null>(
    THEME_CHOICES.find((t) => t.value === spaceInfo.theme.theme) || null
  );
  const [showBrandLogo, setShowBrandLogo] = React.useState(
    spaceInfo.theme.themeOptions.showBrandLogo
  );
  const [isPending, startTransition] = React.useTransition();
  const noTheme = !theme;
  const submitTheme = async () => {
    if (noTheme) {
      startTransition(async () => {
        await updateThemeForSpace({
          theme: null,
          themeOptions: {
            showBrandLogo,
          },
          spaceId: spaceInfo?.id,
        });
      });
      return;
    }

    const themeOptions = {
      showBrandLogo,
      font: effectiveFont,
    };

    startTransition(async () => {
      await updateThemeForSpace({
        theme: theme?.value,
        themeOptions,
        spaceId: spaceInfo?.id,
      });

      updateThemeField("theme", theme?.value);
      updateThemeField("themeOptions", themeOptions);
    });
  };

  React.useEffect(() => {
    if (!noTheme) {
      const selectedTheme = THEME_CHOICES.find((t) => t.value === theme?.value);
      if (selectedTheme) {
        setTheme(selectedTheme);
      }
    }
  }, [theme]);

  const checkDiff = () => {
    return (
      theme?.value === spaceInfo.theme.theme &&
      showBrandLogo === spaceInfo.theme.themeOptions.showBrandLogo &&
      effectiveFont === spaceInfo.theme.themeOptions.font
    );
  };

  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      {/* Top: Settings */}
      <div className="grid items-center gap-4 flex-col sm:grid-cols-1 sm:gap-6 md:grid-cols-2">
        <div className="flex items-center gap-2">
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
          <label
            htmlFor="theme-switch"
            className="font-medium select-none text-sm"
          >
            No Theme
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="brand-logo-switch"
            checked={showBrandLogo}
            onCheckedChange={setShowBrandLogo}
          />
          <label
            htmlFor="brand-logo-switch"
            className="font-medium select-none text-sm"
          >
            Show Brand Logo
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="theme-select" className="font-medium text-sm">
            Theme:
          </label>
          <Select
            value={theme?.value}
            onValueChange={(value) => {
              const selectedTheme = THEME_CHOICES.find(
                (t) => t.value === value
              );
              if (selectedTheme) {
                setTheme(selectedTheme);
              }
            }}
            disabled={noTheme}
          >
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent className="font-sans">
              {THEME_CHOICES.map((theme) => (
                <SelectItem key={theme.value} value={theme.value}>
                  {theme.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="font-select" className="font-medium text-sm">
            Font:
          </label>
          <Select
            value={effectiveFont}
            onValueChange={(font) => {
              handleFontSelect(font);
            }}
            disabled={noTheme}
          >
            <SelectTrigger className="w-56">
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
      <Button
        className="w-max"
        disabled={isPending || checkDiff()}
        onClick={submitTheme}
      >
        {isPending ? "Saving..." : "Save Changes"}
      </Button>

      {/* Bottom: Preview */}
      <div
        className={`rounded-lg p-0 min-h-[300px] transition-colors duration-300 border-2 ${
          !noTheme && theme?.bg
        }`}
      >
        {/* Navbar */}
        <nav
          className={`w-full px-8 py-4 border-b border-foreground flex items-center justify-between bg-transparent`}
        >
          <div className="flex items-center gap-2">
            <Image src={"/logo.svg"} alt="Logo" width={30} height={30} />
            <h2
              className={`text-center font-poppins flex items-center font-semibold text-xl ${
                !noTheme
                  ? theme?.type === "dark"
                    ? "text-white"
                    : "text-black"
                  : "text-foreground"
              }`}
            >
              100xTestimonials
            </h2>
          </div>
        </nav>
        {/* Main Container */}
        <div className="flex justify-center items-center min-h-[250px] py-12">
          <div
            className={cx(
              "rounded-lg p-8 w-full max-w-md flex flex-col gap-4",
              !noTheme
                ? theme?.textClass +
                    " " +
                    theme?.border +
                    " " +
                    theme?.shadow +
                    " " +
                    theme?.alignment
                : "text-center"
            )}
            style={{
              fontFamily: `'${effectiveFont}', ${
                fontList.find((f) => f.family === effectiveFont)?.category ||
                "sans-serif"
              }`,
              background: !noTheme ? theme?.mainContainerBg : undefined,
            }}
          >
            {showBrandLogo && (
              <div className="flex justify-center">
                <Image
                  src={spaceInfo?.logo || "/default-logo.png"}
                  alt="Brand Logo"
                  width={50}
                  height={50}
                  className={`rounded-sm mb-4`}
                />
              </div>
            )}
            <h1 className="text-2xl font-bold mb-2">We Value Your Feedback</h1>
            <h2
              className={`text-lg font-semibold mb-1 ${
                noTheme && "text-foreground/75"
              }`}
            >
              Help us improve by answering a few questions
            </h2>
            <p
              className={`mb-2 text-sm uppercase font-medium opacity-70 ${
                noTheme && "text-left"
              }`}
            >
              Questions:
            </p>
            <ul
              className={`mb-4 text-sm pl-3 ${
                !noTheme ? theme?.listStyle : "list-square"
              } ${!noTheme ? theme?.alignment : "text-left"}`}
              style={{
                listStyleType: theme?.listStyle.includes("none")
                  ? "none"
                  : undefined,
              }}
            >
              <li>How satisfied are you with our service?</li>
              <li>What did you like the most?</li>
              <li>Any suggestions for improvement?</li>
            </ul>
            <div className="flex gap-4 mt-2 mx-auto flex-col sm:flex-row">
              <Button
                type="button"
                className={cx(
                  !noTheme ? `${theme?.primaryButtonColor} text-white` : ""
                )}
              >
                Record video
              </Button>
              <Button
                type="button"
                className={cx(!noTheme ? `${theme?.secondaryButtonColor}` : "")}
                variant={noTheme ? "secondary" : "default"}
              >
                Write as text
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
