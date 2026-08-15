import NotFoundContent from "@/components/not-found-content";
import PublicNavbar from "@/components/public-navbar";
import { Suspense } from "react";

export default async function NotFound() {
  return (
    <div className="font-sans min-h-screen">
      <Suspense fallback={null}>
        <PublicNavbar />
      </Suspense>
      <NotFoundContent />
    </div>
  );
}
