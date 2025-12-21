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
  try {
    const videoMessage = JSON.parse(message) as VideoFeedback;

    console.log("Processing video message:", videoMessage);

    if (!videoMessage.videoUrl) {
      await updateFeedback({
        feedbackId: videoMessage.id,
        spaceId: videoMessage.spaceId,
        isSpam: true,
        analysisStatus: "COMPLETED",
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

    const isSpam = await analyzeSpam(messageToAnalyze);

    console.log(`Spam Analysis: ${isSpam}`);

    if (isSpam) {
      await updateFeedback({
        feedbackId: videoMessage.id,
        spaceId,
        isSpam,
        analysisStatus: "COMPLETED",
      });

      return;
    }

    const sentiment = await analyzeSentiment(transcription as string);

    console.log(`Sentiment Analysis: ${sentiment}`);

    await updateFeedback({
      feedbackId: videoMessage.id,
      spaceId,
      isSpam,
      sentiment,
      analysisStatus: "COMPLETED",
    });
  } catch (error) {
    console.log("Error processing video message:", error);
  }
};
