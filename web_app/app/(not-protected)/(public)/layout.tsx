import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans min-h-screen relative">
      {/* <PublicNavbar /> */}
      {children}
    </div>
  );
}
