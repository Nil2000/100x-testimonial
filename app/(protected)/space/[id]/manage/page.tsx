import React from "react";
import MangeTestimonailsTabContent from "../_components/manage-testimonials";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";

export default function page() {
  return (
    <SidebarProvider>
      <Sidebar />
      <MangeTestimonailsTabContent />
    </SidebarProvider>
  );
}
