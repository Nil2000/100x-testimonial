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
import TestimonialsListManager from "./testimonials/testimonials-list-manager";
import SocialTestimonialsTab from "./testimonials/social-testimonials-tab";
import { manageTestimonialSidebarElementType } from "@/lib/types";
export const manageTestimonialsSidebarElements: manageTestimonialSidebarElementType[] =
  [
    {
      header: "Inbox",
      contents: [
        {
          title: "All",
          icon: WalletCards,
          tabContent: (
            <TestimonialsListManager key="all-testimonials" isSocial={false} />
          ),
        },
        {
          title: "Video",
          icon: Video,
          tabContent: (
            <TestimonialsListManager
              key="video-testimonials"
              category="VIDEO"
              isSocial={false}
            />
          ),
        },
        {
          title: "Text",
          icon: LetterText,
          tabContent: (
            <TestimonialsListManager
              key="text-testimonials"
              category="TEXT"
              isSocial={false}
            />
          ),
        },
        {
          title: "Liked",
          icon: HandHeart,
          tabContent: (
            <TestimonialsListManager
              key="liked-testimonials"
              wallOfLove={true}
              isSocial={false}
            />
          ),
        },
        {
          title: "Spam",
          icon: MessageSquareWarningIcon,
          tabContent: (
            <TestimonialsListManager
              key="spam-testimonials"
              category="SPAM"
              isSocial={false}
            />
          ),
        },
      ],
    },
    {
      header: "Social",
      contents: [
        {
          title: "Social",
          icon: Send,
          tabContent: <SocialTestimonialsTab key="social-testimonials" />,
        },
      ],
    },
    // {
    //   header: "Embed widgets",
    //   contents: [
    //     {
    //       title: "Wall of love",
    //       icon: Heart,
    //       tabContent: <TestimonialsListManager filter="embed-love" key="embed-love-testimonials" />,
    //     },
    //     {
    //       title: "Single testimonials",
    //       icon: Heart,
    //       tabContent: <TestimonialsListManager filter="all" key="all-testimonials" />,
    //     },
    //   ],
    // },
    // {
    //   header: "Pages",
    //   contents: [
    //     {
    //       title: "Request testimonails",
    //       icon: Send,
    //       tabContent: <TestimonialsListManager key="request-testimonials" category="request" />,
    //     },
    //     {
    //       title: "Wall of love",
    //       icon: Heart,
    //       tabContent: <TestimonialsListManager key="wall-of-love-testimonials" wallOfLove={true} />,
    //     },
    //   ],
    // },
  ];
