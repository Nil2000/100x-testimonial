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
import { setThemeForSpace } from "@/actions/themeActions";
import { THEME_CHOICES } from "@/lib/constants";

// const THEME_CHOICES = [
//   // Light Themes
//   {
//     label: "Sunrise Bliss",
//     value: "sunrise",
//     primaryButtonColor: "bg-pink-500 hover:bg-pink-600",
//     secondaryButtonColor: "bg-orange-200 hover:bg-orange-300 text-pink-700",
//     bg: "bg-gradient-to-r from-orange-200 via-pink-300 to-yellow-200",
//     border: "border-2 border-pink-300",
//     shadow: "shadow-xl",
//     textClass: "text-pink-900 font-serif",
//     alignment: "text-left",
//     listStyle: "list-disc text-pink-700",
//     defaultFont: "Montserrat",
//     mainContainerBg: "rgba(255,255,255,0.8)",
//     type: "light",
//   },
//   {
//     label: "Minty Fresh",
//     value: "minty",
//     primaryButtonColor: "bg-emerald-500 hover:bg-emerald-600",
//     secondaryButtonColor: "bg-green-100 hover:bg-teal-200 text-emerald-700",
//     bg: "bg-gradient-to-r from-green-100 via-teal-100 to-lime-100",
//     border: "border border-green-300",
//     shadow: "shadow-md",
//     textClass: "text-emerald-900 font-sans",
//     alignment: "text-left",
//     listStyle: "list-decimal text-emerald-700",
//     defaultFont: "Nunito",
//     mainContainerBg: "rgba(255,255,255,0.8)",
//     type: "light",
//   },
//   {
//     label: "Golden Hour",
//     value: "golden",
//     primaryButtonColor: "bg-yellow-500 hover:bg-yellow-600",
//     secondaryButtonColor: "bg-orange-200 hover:bg-yellow-200 text-yellow-700",
//     bg: "bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-200",
//     border: "border-4 border-yellow-300",
//     shadow: "shadow-2xl",
//     textClass: "text-yellow-900 font-serif",
//     alignment: "text-right",
//     listStyle: "list-decimal text-yellow-700",
//     defaultFont: "Playfair Display",
//     mainContainerBg: "rgba(255,255,255,0.8)",
//     type: "light",
//   },
//   {
//     label: "Lavender Dream",
//     value: "lavender",
//     primaryButtonColor: "bg-purple-500 hover:bg-purple-600",
//     secondaryButtonColor: "bg-pink-100 hover:bg-indigo-200 text-purple-700",
//     bg: "bg-gradient-to-br from-purple-200 via-indigo-100 to-pink-100",
//     border: "border-4 border-purple-200",
//     shadow: "shadow-2xl",
//     textClass: "text-purple-900 font-mono",
//     alignment: "text-right",
//     listStyle: "list-none text-purple-700",
//     defaultFont: "Lato",
//     mainContainerBg: "rgba(255,255,255,0.8)",
//     type: "light",
//   },
//   {
//     label: "Oceanic Calm",
//     value: "oceanic",
//     primaryButtonColor: "bg-cyan-600 hover:bg-cyan-700",
//     secondaryButtonColor: "bg-blue-200 hover:bg-cyan-200 text-cyan-800",
//     bg: "bg-gradient-to-r from-blue-200 via-cyan-200 to-teal-100",
//     border: "border-2 border-blue-300",
//     shadow: "shadow-lg",
//     textClass: "text-blue-900 font-sans",
//     alignment: "text-center",
//     listStyle: "list-circle text-cyan-800",
//     defaultFont: "Roboto",
//     mainContainerBg: "rgba(255,255,255,0.8)",
//     type: "light",
//   },
//   // Dark Themes
//   {
//     label: "Midnight Indigo",
//     value: "midnight",
//     primaryButtonColor: "bg-indigo-700 hover:bg-indigo-800",
//     secondaryButtonColor: "bg-blue-900 hover:bg-indigo-900 text-indigo-300",
//     bg: "bg-gradient-to-br from-indigo-900 via-gray-900 to-blue-900",
//     border: "border-2 border-indigo-700",
//     shadow: "shadow-2xl",
//     textClass: "text-indigo-100 font-mono",
//     alignment: "text-left",
//     listStyle: "list-disc text-indigo-300",
//     defaultFont: "Roboto Mono",
//     mainContainerBg: "rgba(30, 41, 59, 0.95)",
//     type: "dark",
//   },
//   {
//     label: "Slate Modern",
//     value: "slate",
//     primaryButtonColor: "bg-violet-700 hover:bg-violet-800",
//     secondaryButtonColor: "bg-purple-900 hover:bg-violet-900 text-violet-300",
//     bg: "bg-gradient-to-br from-violet-900 via-violet-800 to-purple-900",
//     border: "border-2 border-violet-700",
//     shadow: "shadow-xl",
//     textClass: "text-violet-100 font-mono",
//     alignment: "text-left",
//     listStyle: "list-disc text-violet-300",
//     defaultFont: "Roboto Mono",
//     mainContainerBg: "rgba(49, 24, 77, 0.95)",
//     type: "dark",
//   },
//   {
//     label: "Forest Night",
//     value: "forest-night",
//     primaryButtonColor: "bg-emerald-800 hover:bg-emerald-900",
//     secondaryButtonColor: "bg-green-900 hover:bg-emerald-900 text-emerald-300",
//     bg: "bg-gradient-to-br from-green-900 via-emerald-800 to-lime-900",
//     border: "border border-emerald-700",
//     shadow: "shadow-lg",
//     textClass: "text-emerald-100 font-sans",
//     alignment: "text-center",
//     listStyle: "list-dot text-emerald-300",
//     defaultFont: "Inter",
//     mainContainerBg: "rgba(30, 41, 59, 0.95)",
//     type: "dark",
//   },
//   {
//     label: "Rose Quartz Dark",
//     value: "rose-dark",
//     primaryButtonColor: "bg-fuchsia-700 hover:bg-fuchsia-800",
//     secondaryButtonColor: "bg-rose-800 hover:bg-fuchsia-900 text-pink-200",
//     bg: "bg-gradient-to-br from-fuchsia-900 via-rose-800 to-pink-700",
//     border: "border-2 border-fuchsia-700",
//     shadow: "shadow-2xl",
//     textClass: "text-fuchsia-100 font-sans",
//     alignment: "text-center",
//     listStyle: "list-disc text-pink-200",
//     defaultFont: "Rubik",
//     mainContainerBg: "rgba(55, 7, 55, 0.92)",
//     type: "dark",
//   },
//   {
//     label: "Charcoal Classic",
//     value: "charcoal",
//     primaryButtonColor: "bg-rose-700 hover:bg-amber-900",
//     secondaryButtonColor: "bg-amber-900 hover:bg-rose-900 text-amber-300",
//     bg: "bg-gradient-to-r from-rose-900 via-amber-900 to-rose-700",
//     border: "border-2 border-rose-700",
//     shadow: "shadow-2xl",
//     textClass: "text-rose-100 font-sans",
//     alignment: "text-right",
//     listStyle: "list-decimal text-amber-300",
//     defaultFont: "Open Sans",
//     mainContainerBg: "rgba(67, 20, 36, 0.95)",
//     type: "dark",
//   },
// ];

export default function TestimonialPage() {
  const [noTheme, setNoTheme] = React.useState(true);
  const [selectedTheme, setSelectedTheme] = React.useState(
    THEME_CHOICES[0].value
  );
  const theme =
    THEME_CHOICES.find((t) => t.value === selectedTheme) ?? THEME_CHOICES[0];
  const { fontSelected, handleFontSelect, fontList } = useFont();
  const effectiveFont = fontSelected;
  const [showBrandLogo, setShowBrandLogo] = React.useState(true);
  const { spaceInfo } = useSpaceStore();
  const [isPending, startTransition] = React.useTransition();

  const submitTheme = async () => {
    if (noTheme) {
      startTransition(async () => {
        await setThemeForSpace({
          theme: null,
          themeOptions: {},
          spaceId: spaceInfo?.id,
        });
      });
      return;
    }

    const themeOptions = {
      showBrandLogo,
      customFont: effectiveFont,
    };

    startTransition(async () => {
      await setThemeForSpace({
        theme: selectedTheme,
        themeOptions,
        spaceId: spaceInfo?.id,
      });
    });
  };

  React.useEffect(() => {
    if (!noTheme) {
      handleFontSelect(theme.defaultFont);
    }
  }, [selectedTheme, noTheme]);

  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      <div className="flex items-center gap-2">
        <Switch
          id="theme-switch"
          checked={noTheme}
          onCheckedChange={setNoTheme}
        />
        <label htmlFor="theme-switch" className="font-medium select-none">
          No Theme
        </label>
      </div>
      {/* Top: Settings */}
      <div className="grid items-center gap-4 flex-col sm:grid-cols-1 sm:gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="theme-select" className="font-medium">
            Theme:
          </label>
          <Select
            value={selectedTheme}
            onValueChange={setSelectedTheme}
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
          <label htmlFor="font-select" className="font-medium">
            Font:
          </label>
          <Select
            value={effectiveFont}
            onValueChange={handleFontSelect}
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
        <div className="flex items-center gap-2">
          <Switch
            id="brand-logo-switch"
            checked={showBrandLogo}
            onCheckedChange={setShowBrandLogo}
            disabled={noTheme}
          />
          <label
            htmlFor="brand-logo-switch"
            className="font-medium select-none"
          >
            Show Brand Logo
          </label>
        </div>
      </div>
      <Button className="w-max" disabled={isPending} onClick={submitTheme}>
        {isPending ? "Saving..." : "Save Changes"}
      </Button>

      {/* Bottom: Preview */}
      <div
        className={`rounded-lg p-0 min-h-[300px] transition-colors duration-300 border-2 ${
          !noTheme && theme.bg
        }`}
      >
        {/* Navbar */}
        <nav
          className={`w-full px-8 py-4 border-b border-foreground flex items-center justify-between bg-transparent`}
        >
          <div className="flex items-center gap-2">
            <Image src={"/logo.svg"} alt="Logo" width={30} height={30} />
            <h2
              className={`text-center font-poppins flex items-center text-xl font-semibold ${
                !noTheme
                  ? theme.type === "dark"
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
                ? theme.textClass +
                    " " +
                    theme.border +
                    " " +
                    theme.shadow +
                    " " +
                    theme.alignment
                : "text-center"
            )}
            style={{
              fontFamily: `'${effectiveFont}', ${
                fontList.find((f) => f.family === effectiveFont)?.category ||
                "sans-serif"
              }`,
              background: !noTheme ? theme.mainContainerBg : undefined,
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
                !noTheme ? theme.listStyle : "list-square"
              } ${!noTheme ? theme.alignment : "text-left"}`}
              style={{
                listStyleType: theme.listStyle.includes("none")
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
                  !noTheme ? `${theme.primaryButtonColor} text-white` : ""
                )}
              >
                Record video
              </Button>
              <Button
                type="button"
                className={cx(!noTheme ? `${theme.secondaryButtonColor}` : "")}
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
