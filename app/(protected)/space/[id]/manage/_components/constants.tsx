import { Video, WalletCards } from "lucide-react";
import ListTestimonials from "./list-testimonials";
export const manageTestimonialsSidebarElements = [
  {
    header: "Feedback",
    contents: [
      {
        title: "All",
        icon: WalletCards,
        tabContent: <ListTestimonials />,
      },
      {
        title: "Video",
        icon: Video,
        tabContent: <ListTestimonials category="video" />,
      },
      {
        title: "Text",
        icon: Video,
        tabContent: <ListTestimonials category="text" />,
      },
    ],
  },
];
