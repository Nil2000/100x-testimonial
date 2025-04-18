export interface TextFeedback {
  id: string;
  answer: string | null;
  name: string;
  email: string;
  spaceId: string;
}

export interface VideoFeedback {
  id: string;
  videoUrl: string;
  name: string;
  email: string;
  spaceId: string;
}
