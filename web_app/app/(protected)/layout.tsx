import React from "react";
import Navbar from "@/components/navbar";
export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen font-sans pt-20 container mx-auto w-full">
        {children}
      </div>
    </>
  );
}
