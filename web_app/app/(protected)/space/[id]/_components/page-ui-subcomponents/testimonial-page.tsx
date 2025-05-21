import React from "react";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Add listStyle and buttonColor to each theme
const themes = [
  {
    label: "Sunrise Bliss",
    value: "sunrise",
    bg: "bg-gradient-to-r from-orange-200 via-pink-300 to-yellow-200",
    border: "border-2 border-pink-300",
    shadow: "shadow-xl",
    text: "text-gray-900 text-left font-serif",
    listStyle: "list-disc text-left text-pink-700",
    buttonColor: "bg-pink-500 hover:bg-pink-600 text-white",
  },
  {
    label: "Oceanic Calm",
    value: "oceanic",
    bg: "bg-gradient-to-r from-blue-200 via-cyan-200 to-teal-100",
    border: "border-2 border-blue-300",
    shadow: "shadow-lg",
    text: "text-blue-900 text-center font-sans",
    listStyle: "list-circle text-center text-cyan-800",
    buttonColor: "bg-cyan-600 hover:bg-cyan-700 text-white",
  },
  {
    label: "Lavender Dream",
    value: "lavender",
    bg: "bg-gradient-to-br from-purple-200 via-indigo-100 to-pink-100",
    border: "border-4 border-purple-200",
    shadow: "shadow-2xl",
    text: "text-purple-900 text-right font-mono",
    listStyle: "list-none text-right text-purple-700",
    buttonColor: "bg-purple-500 hover:bg-purple-600 text-white",
  },
  {
    label: "Minty Fresh",
    value: "minty",
    bg: "bg-gradient-to-r from-green-100 via-teal-100 to-lime-100",
    border: "border border-green-300",
    shadow: "shadow-md",
    text: "text-green-900 text-left font-sans",
    listStyle: "list-decimal text-left text-emerald-700",
    buttonColor: "bg-emerald-500 hover:bg-emerald-600 text-white",
  },
  {
    label: "Rose Quartz",
    value: "rose",
    bg: "bg-gradient-to-r from-rose-100 via-pink-200 to-rose-200",
    border: "border-2 border-rose-300",
    shadow: "shadow-lg",
    text: "text-rose-900 text-center font-serif",
    listStyle: "list-square text-center text-rose-700",
    buttonColor: "bg-rose-500 hover:bg-rose-600 text-white",
  },
  {
    label: "Slate Modern",
    value: "slate",
    bg: "bg-slate-100",
    border: "border-2 border-slate-300",
    shadow: "shadow-xl",
    text: "text-slate-800 text-left font-mono",
    listStyle: "list-disc text-left text-slate-700",
    buttonColor: "bg-slate-700 hover:bg-slate-800 text-white",
  },
  {
    label: "Golden Hour",
    value: "golden",
    bg: "bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-200",
    border: "border-4 border-yellow-300",
    shadow: "shadow-2xl",
    text: "text-yellow-900 text-right font-serif",
    listStyle: "list-decimal text-right text-yellow-700",
    buttonColor: "bg-yellow-500 hover:bg-yellow-600 text-white",
  },
  {
    label: "Forest Whisper",
    value: "forest",
    bg: "bg-gradient-to-br from-green-200 via-emerald-100 to-lime-200",
    border: "border border-emerald-300",
    shadow: "shadow-lg",
    text: "text-emerald-900 text-center font-sans",
    listStyle: "list-dot text-center text-emerald-800",
    buttonColor: "bg-emerald-700 hover:bg-emerald-800 text-white",
  },
];

export default function TestimonialPage() {
  const [selectedTheme, setSelectedTheme] = useState(themes[0].value);
  const theme = themes.find((t) => t.value === selectedTheme) ?? themes[0];

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Top: Settings */}
      <div className="flex items-center gap-4">
        <label htmlFor="theme-select" className="font-medium">
          Theme:
        </label>
        <Select value={selectedTheme} onValueChange={setSelectedTheme}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent className="font-sans">
            {themes.map((theme) => (
              <SelectItem key={theme.value} value={theme.value}>
                {theme.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bottom: Preview */}
      <div
        className={`rounded-lg p-0 min-h-[300px] transition-colors duration-300 ${theme.bg}`}
      >
        {/* Navbar */}
        <nav className="w-full px-8 py-4 border-b border-white flex items-center justify-between bg-transparent">
          <span className="font-bold text-lg text-black">BrandLogo</span>
        </nav>
        {/* Main Container */}
        <div className="flex justify-center items-center min-h-[250px] py-12">
          <div
            className={`bg-white/80 rounded-lg p-8 w-full max-w-md flex flex-col gap-4 ${theme.text} ${theme.border} ${theme.shadow}`}
          >
            <h1 className="text-2xl font-bold mb-2">We Value Your Feedback</h1>
            <h2 className="text-lg font-semibold mb-1">
              Help us improve by answering a few questions
            </h2>
            <p className="mb-4 text-sm text-gray-700">
              Your honest feedback helps us serve you better. Please answer the
              following questions:
            </p>
            <ul
              className={`mb-4 text-sm pl-3 ${theme.listStyle}`}
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
              <Button type="button" className={theme.buttonColor}>
                Save as Draft
              </Button>
              <Button
                type="button"
                className={theme.buttonColor + " opacity-80"}
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
