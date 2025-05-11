import { CollectionType, FeedbackType } from "./db";

export const sampleQuestions = [
  {
    id: "1",
    title: "Who are you / what are you working on?",
    maxLength: 50,
  },
  {
    id: "2",
    title: "What is the best thing about [our product / service]",
    maxLength: 50,
  },
  {
    id: "3",
    title: "How has [our product / service] helped you?",
    maxLength: 50,
  },
];
export const dropDownOptionsTextVideo = [
  { id: 1, name: "Text only", value: CollectionType.TEXT },
  { id: 2, name: "Video only", value: CollectionType.VIDEO },
  { id: 3, name: "Text and Video both", value: CollectionType.TEXT_AND_VIDEO },
];
export const feedbackConstants = ["1", "2", "3", "4", "5"];

export type StepType = "init" | "check-permission";

export const videoJSOptions = {
  autoplay: false,
  controls: true,
  responsive: true,
  fluid: true,
  aspectRatio: "16:9",
  preload: "auto",
  controlBar: {
    remainingTimeDisplay: false,
    pictureInPictureToggle: false,
  },
};

export const feedbackPerPage = 5;

export const debounceTime = 300;

export const KAFKA_QUEUE = {
  text_topic: "text-processor",
  video_topic: "video-processor",
};

export const UPLOAD_VIDEO_MAX_SIZE =
  Number(process.env.NEXT_PUBLIC_UPLOAD_VIDEO_MAX_SIZE || "5") * 1024 * 1024; // 10 MB
export const UPLOAD_VIDEO_MAX_DURATION =
  Number(process.env.NEXT_PUBLIC_UPLOAD_VIDEO_MAX_DURATION || "5") * 60; // 300 seconds

export const DROPDOWN_ANALYTICS_PAGE_OPTIONS = [
  {
    value: "req-test-page",
    name: "Request Testimonial Page",
  },
  {
    value: "wall-of-love-page",
    name: "Wall of Love Page",
  },
];

export const DROPDOWN_ANALYTICS_PAGE_DATE_OPTIONS = [
  {
    value: "7",
    name: "Last 7 Days",
  },
  {
    value: "30",
    name: "Last 30 Days",
  },
  {
    value: "60",
    name: "Last 60 Days",
  },
  {
    value: "90",
    name: "Last 90 Days",
  },
];

export const METRIC_PAGE = {
  REQ_PAGE: "req-test-page",
  WALL_PAGE: "wall-of-love-page",
};

// export const API_METRIC = {
//   PAGE_VIEWS: "page-views",
//   VISITORS: "visitors",
//   COMPLETED_ACTIONS: "completed-actions",
//   TIME_SPENT_ON_WALL_OF_LOVE: "time-spent-on-wall-of-love",
// };

export const POSTHOG_METRIC_EVENTS = {
  PAGE_VIEW: "page-view",
  UNIQUE_VISITORS: "unique-visitors",
  COMPLETED_TESTIMONIAL: "completed-testimonial",
};

export const POSTHOG_METRIC_CLIENT_EVENTS = {
  PAGE_OPENED: "page-opened",
  PAGE_EXITED: "page-exited",
  TESTIMONIAL_SUBMITTED: "completed-testimonial",
};
