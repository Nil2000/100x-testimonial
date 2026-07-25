import NotFoundContent from "@/components/not-found-content";
import PublicNavbar from "@/components/public-navbar";

export default async function NotFound() {
  return (
    <div className="font-sans min-h-screen">
      <PublicNavbar />
      <NotFoundContent />
    </div>
  );
}
