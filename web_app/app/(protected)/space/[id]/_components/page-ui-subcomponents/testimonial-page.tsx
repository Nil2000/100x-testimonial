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
import { useFont } from "@/hooks/use-font";
import { useSpaceStore } from "@/store/spaceStore";
import Image from "next/image";
import { THEME_CHOICES } from "@/lib/constants";

// Add a defaultFont property to each theme

export default function TestimonialPage() {
  const [selectedTheme, setSelectedTheme] = React.useState(
    THEME_CHOICES[0].value
  );
  const theme =
    THEME_CHOICES.find((t) => t.value === selectedTheme) ?? THEME_CHOICES[0];
  const { fontSelected, handleFontSelect, fontList } = useFont();
  const effectiveFont = fontSelected;
  const [showBrandLogo, setShowBrandLogo] = React.useState(true);
  const [showBrandText, setShowBrandText] = React.useState(true);
  const { spaceInfo } = useSpaceStore();

  React.useEffect(() => {
    handleFontSelect(theme.defaultFont);
  }, [selectedTheme]);

  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      {/* Top: Settings */}
      <div className="grid items-center gap-4 flex-col sm:grid-cols-1 sm:gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="theme-select" className="font-medium">
            Theme:
          </label>
          <Select value={selectedTheme} onValueChange={setSelectedTheme}>
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
          <Select value={effectiveFont} onValueChange={handleFontSelect}>
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
        <div className="flex items-center gap-2 ml-6">
          <Switch
            id="brand-logo-switch"
            checked={showBrandLogo}
            onCheckedChange={setShowBrandLogo}
          />
          <label
            htmlFor="brand-logo-switch"
            className="font-medium select-none"
          >
            Show Brand Logo
          </label>
        </div>
      </div>
      <Button className="w-max">Save Changes</Button>

      {/* Bottom: Preview */}
      <div
        className={`rounded-lg p-0 min-h-[300px] transition-colors duration-300 ${theme.bg}`}
      >
        {/* Navbar */}
        <nav className="w-full px-8 py-4 border-b border-white flex items-center justify-between bg-transparent">
          <div className="flex items-center gap-2">
            <Image src={"/logo.svg"} alt="Logo" width={30} height={30} />
            <h2 className="text-center font-poppins flex items-center text-xl text-black font-semibold">
              100xTestimonials
            </h2>
          </div>
        </nav>
        {/* Main Container */}
        <div className="flex justify-center items-center min-h-[250px] py-12">
          <div
            className={`rounded-lg p-8 w-full max-w-md flex flex-col gap-4 ${theme.text} ${theme.border} ${theme.shadow} ${theme.alignment}`}
            style={{
              fontFamily: `'${effectiveFont}', ${
                fontList.find((f) => f.family === effectiveFont)?.category ||
                "sans-serif"
              }`,
              background: theme.mainContainerBg,
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
            <h2 className="text-lg font-semibold mb-1">
              Help us improve by answering a few questions
            </h2>
            <p className="mb-2 text-sm text-gray-700 uppercase font-medium">
              Questions:
            </p>
            <ul
              className={`mb-4 text-sm pl-3 ${theme.listStyle} ${theme.alignment}`}
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
                className={theme.buttonColor + " opacity-80"}
              >
                Record video
              </Button>
              <Button type="button" className={theme.buttonColor}>
                Write as text
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
