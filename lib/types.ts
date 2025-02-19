import { LucideIcon } from "lucide-react";

export interface CreateSpaceQuestion {
  id: string;
  title: string;
  maxLength: number;
}
export interface manageTestimonialSidebarElementType {
  header: string;
  contents: {
    title: string;
    icon: LucideIcon;
    tabContent: any;
  }[];
}
