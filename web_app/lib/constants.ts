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
  TIME_SPENT_ON_WALL_OF_LOVE: "time-spent-on-wall-of-love",
};

export const POSTHOG_METRIC_CLIENT_EVENTS = {
  PAGE_OPENED: "page-opened",
  PAGE_EXITED: "page-exited",
  TESTIMONIAL_SUBMITTED: "completed-testimonial",
  TIME_SPENT_ON_WALL_OF_LOVE: "time-spent-on-wall-of-love",
};

export const THEME_CHOICES = [
  // Light Themes
  {
    label: "Sunrise Bliss",
    value: "sunrise",
    bg: "bg-gradient-to-r from-orange-200 via-pink-300 to-yellow-200",
    border: "border-2 border-pink-300",
    shadow: "shadow-xl",
    text: "text-gray-900 font-serif",
    alignment: "text-left",
    listStyle: "list-disc text-pink-700",
    buttonColor: "bg-pink-500 hover:bg-pink-600 text-white",
    defaultFont: "Montserrat",
    mainContainerBg: "rgba(255,255,255,0.8)",
  },
  {
    label: "Minty Fresh",
    value: "minty",
    bg: "bg-gradient-to-r from-green-100 via-teal-100 to-lime-100",
    border: "border border-green-300",
    shadow: "shadow-md",
    text: "text-green-900 font-sans",
    alignment: "text-left",
    listStyle: "list-decimal text-emerald-700",
    buttonColor: "bg-emerald-500 hover:bg-emerald-600 text-white",
    defaultFont: "Nunito",
    mainContainerBg: "rgba(255,255,255,0.8)",
  },
  {
    label: "Golden Hour",
    value: "golden",
    bg: "bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-200",
    border: "border-4 border-yellow-300",
    shadow: "shadow-2xl",
    text: "text-yellow-900 font-serif",
    alignment: "text-right",
    listStyle: "list-decimal text-yellow-700",
    buttonColor: "bg-yellow-500 hover:bg-yellow-600 text-white",
    defaultFont: "Playfair Display",
    mainContainerBg: "rgba(255,255,255,0.8)",
  },
  {
    label: "Lavender Dream",
    value: "lavender",
    bg: "bg-gradient-to-br from-purple-200 via-indigo-100 to-pink-100",
    border: "border-4 border-purple-200",
    shadow: "shadow-2xl",
    text: "text-purple-900 font-mono",
    alignment: "text-right",
    listStyle: "list-none text-purple-700",
    buttonColor: "bg-purple-500 hover:bg-purple-600 text-white",
    defaultFont: "Lato",
    mainContainerBg: "rgba(255,255,255,0.8)",
  },
  {
    label: "Oceanic Calm",
    value: "oceanic",
    bg: "bg-gradient-to-r from-blue-200 via-cyan-200 to-teal-100",
    border: "border-2 border-blue-300",
    shadow: "shadow-lg",
    text: "text-blue-900 font-sans",
    alignment: "text-center",
    listStyle: "list-circle text-cyan-800",
    buttonColor: "bg-cyan-600 hover:bg-cyan-700 text-white",
    defaultFont: "Roboto",
    mainContainerBg: "rgba(255,255,255,0.8)",
  },

  // Dark Themes
  {
    label: "Midnight Indigo",
    value: "midnight",
    bg: "bg-gradient-to-br from-indigo-900 via-gray-900 to-blue-900",
    border: "border-2 border-indigo-700",
    shadow: "shadow-2xl",
    text: "text-indigo-100 font-mono",
    alignment: "text-left",
    listStyle: "list-disc text-indigo-300",
    buttonColor: "bg-indigo-700 hover:bg-indigo-800 text-white",
    defaultFont: "Roboto Mono",
    mainContainerBg: "rgba(30, 41, 59, 0.95)",
  },
  {
    label: "Slate Modern",
    value: "slate",
    bg: "bg-slate-900",
    border: "border-2 border-slate-700",
    shadow: "shadow-xl",
    text: "text-slate-100 font-mono",
    alignment: "text-left",
    listStyle: "list-disc text-slate-300",
    buttonColor: "bg-slate-700 hover:bg-slate-800 text-white",
    defaultFont: "Roboto Mono",
    mainContainerBg: "rgba(30, 41, 59, 0.95)",
  },
  {
    label: "Forest Night",
    value: "forest-night",
    bg: "bg-gradient-to-br from-green-900 via-emerald-800 to-lime-900",
    border: "border border-emerald-700",
    shadow: "shadow-lg",
    text: "text-emerald-100 font-sans",
    alignment: "text-center",
    listStyle: "list-dot text-emerald-300",
    buttonColor: "bg-emerald-800 hover:bg-emerald-900 text-white",
    defaultFont: "Inter",
    mainContainerBg: "rgba(30, 41, 59, 0.95)",
  },
  {
    label: "Rose Quartz Dark",
    value: "rose-dark",
    bg: "bg-gradient-to-br from-fuchsia-900 via-rose-800 to-pink-700",
    border: "border-2 border-fuchsia-700",
    shadow: "shadow-2xl",
    text: "text-fuchsia-100 font-sans",
    alignment: "text-center",
    listStyle: "list-disc text-pink-200",
    buttonColor: "bg-fuchsia-700 hover:bg-fuchsia-800 text-white",
    defaultFont: "Rubik",
    mainContainerBg: "rgba(55, 7, 55, 0.92)",
  },
  {
    label: "Charcoal Classic",
    value: "charcoal",
    bg: "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700",
    border: "border-2 border-gray-700",
    shadow: "shadow-2xl",
    text: "text-gray-100 font-sans",
    alignment: "text-right",
    listStyle: "list-decimal text-gray-300",
    buttonColor: "bg-gray-700 hover:bg-gray-800 text-white",
    defaultFont: "Open Sans",
    mainContainerBg: "rgba(30, 41, 59, 0.95)",
  },
];
