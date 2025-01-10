"use client";
import React from "react";
import WordRotate from "./ui/word-rotate";
import Navbar from "./Navbar";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="w-full h-[calc(100vh-2.5rem)] flex items-center justify-center font-sans">
        <WordRotate
          words={[
            "Empowering journeys, one testimonial at a time.",
            "What people say about us speaks louder than words.",
            "Hear from those who matter most: Our customers.",
          ]}
          className="sm:text-4xl text-xl font-bold text-center bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent font-mono"
        />
      </div>
    </>
  );
}
