import LandingPage from "@/components/landing-page";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  return <LandingPage session={session} />;
}
