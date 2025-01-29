import React from "react";
import PublicNavbar from "./_components/public-navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans min-h-screen">
      <PublicNavbar />
      {children}
    </div>
  );
}
