import PublicNavbar from "@/components/public-navbar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans min-h-screen">
      <PublicNavbar />
      {children}
    </div>
  );
}
