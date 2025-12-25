import { analyzeSentiment } from "../ai/analyzeSentiment";
import { analyzeSpam } from "../ai/analyzeSpam";
import { getVideoTranscription } from "../ai/getVideoTranscription";
import type { VideoFeedback } from "../types";
import { updateFeedback } from "./updateFeedback";

type Props = {
  answer: string;
  name: string;
  email: string;
};

const generateForTextFeedback = (feedback: Props) => {
  return `feedback: ${feedback.answer}, name: ${feedback.name}, email: ${feedback.email}`;
};

export const processVideoMessage = async (message: string) => {
  let isSpam = false;
  let sentiment = "";
  try {
    const videoMessage = JSON.parse(message) as VideoFeedback;

    console.log("Processing video message:", videoMessage);

    // if video url is empty
    if (!videoMessage.videoUrl) {
      await updateFeedback({
        feedbackId: videoMessage.id,
        spaceId: videoMessage.spaceId,
        isSpam: true,
        sentiment: "",
        spamStatus: "COMPLETED",
        sentimentStatus: "COMPLETED",
      });
      return;
    }

    const { videoUrl, name, email, spaceId } = videoMessage;

    const transcription = await getVideoTranscription(videoUrl);

    const messageToAnalyze = generateForTextFeedback({
      answer: transcription as string,
      name,
      email,
    });

    if (videoMessage.isSpamEnabled) {
      isSpam = await analyzeSpam(messageToAnalyze);
      console.log(`Spam Analysis: ${isSpam}`);
    }

    if (videoMessage.isSentimentEnabled) {
      sentiment = await analyzeSentiment(transcription as string);
      console.log(`Sentiment Analysis: ${sentiment}`);
    }

    await updateFeedback({
      feedbackId: videoMessage.id,
      spaceId,
      isSpam,
      sentiment,
      spamStatus: "COMPLETED",
      sentimentStatus: "COMPLETED",
    });
  } catch (error) {
    console.error("Error processing video message:", error);
    // Update status to FAILED on error
    try {
      const videoMessage = JSON.parse(message) as VideoFeedback;
      await updateFeedback({
        feedbackId: videoMessage.id,
        spaceId: videoMessage.spaceId,
        isSpam: false,
        sentiment: "",
        spamStatus: "FAILED",
        sentimentStatus: "FAILED",
      });
    } catch (parseError) {
      console.error("Failed to parse error message:", parseError);
    }
  }
};
