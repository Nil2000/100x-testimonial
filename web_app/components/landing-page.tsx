"use client";
import React, { useEffect, useState } from "react";
import LandingPageNavbarV2 from "./landing-page-navbarv2";
import { Session } from "next-auth";
import HeroSection from "./hero-section";
type Props = {
  session: Session | null;
};
export default function LandingPage({ session }: Props) {
  const [isloading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isloading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen font-sans">
      <LandingPageNavbarV2 session={session} />
      <HeroSection loggedIn={!!session} />
      {/* <div className="w-full min-h-screen flex items-center justify-center font-sans">
        <WordRotate
          words={[
            "Empowering journeys, one testimonial at a time.",
            "What people say about us speaks louder than words.",
            "Hear from those who matter most: Our customers.",
          ]}
          className="sm:text-4xl text-xl font-bold text-center bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent font-mono"
        />
      </div> */}
    </div>
  );
}
