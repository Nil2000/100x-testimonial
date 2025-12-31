export interface TextFeedback {
  id: string;
  answer: string | null;
  name: string;
  email: string;
  spaceId: string;
  isSentimentEnabled: boolean;
  isSpamEnabled: boolean;
}

export interface VideoFeedback {
  id: string;
  videoUrl: string;
  name: string;
  email: string;
  spaceId: string;
  isSentimentEnabled: boolean;
  isSpamEnabled: boolean;
}

export interface Feedback {
  id: string;
  answer: string | null;
  videoUrl: string | null;
  name: string;
  email: string;
  spaceId: string;
  isSentimentEnabled: boolean;
  isSpamEnabled: boolean;
  isVideo: boolean;
}
