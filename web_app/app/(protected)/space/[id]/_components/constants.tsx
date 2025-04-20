import {
  Code2,
  HandHeart,
  Heart,
  LetterText,
  MessageSquareWarningIcon,
  Send,
  Video,
  WalletCards,
} from "lucide-react";
import ListTestimonials from "./list-testimonials";
import { manageTestimonialSidebarElementType } from "@/lib/types";
export const manageTestimonialsSidebarElements: manageTestimonialSidebarElementType[] =
  [
    {
      header: "Inbox",
      contents: [
        {
          title: "All",
          icon: WalletCards,
          tabContent: <ListTestimonials />,
        },
        {
          title: "Video",
          icon: Video,
          tabContent: <ListTestimonials category="VIDEO" />,
        },
        {
          title: "Text",
          icon: LetterText,
          tabContent: <ListTestimonials category="TEXT" />,
        },
        {
          title: "Liked",
          icon: HandHeart,
          tabContent: <ListTestimonials wallOfLove={true} />,
        },
        {
          title: "Spam",
          icon: MessageSquareWarningIcon,
          tabContent: <ListTestimonials category="SPAM" />,
        },
      ],
    },
    // {
    //   header: "Embed widgets",
    //   contents: [
    //     {
    //       title: "Wall of love",
    //       icon: Heart,
    //       tabContent: <ListTestimonials category="embed-love" />,
    //     },
    //     {
    //       title: "Single testimonials",
    //       icon: Heart,
    //       tabContent: <ListTestimonials category="embed-single" />,
    //     },
    //   ],
    // },
    // {
    //   header: "Pages",
    //   contents: [
    //     {
    //       title: "Request testimonails",
    //       icon: Send,
    //       tabContent: <ListTestimonials category="request" />,
    //     },
    //     {
    //       title: "Wall of love",
    //       icon: Heart,
    //       tabContent: <ListTestimonials category="wall-of-love" />,
    //     },
    //   ],
    // },
  ];
