import { analyzeSentiment } from "../ai/analyzeSentiment";
import { analyzeSpam } from "../ai/analyzeSpam";
import type { TextFeedback } from "../types";
import { updateFeedback } from "./updateFeedback";

const generateForTextFeedback = (feedback: TextFeedback) => {
  return `feedback: ${feedback.answer}, name: ${feedback.name}, email: ${feedback.email}`;
};

export const processTextMessage = async (message: string) => {
  let isSpam = false;
  let sentiment = "";
  try {
    const feedback = JSON.parse(message) as TextFeedback;

    // if feedback is empty
    if (!feedback.answer) {
      await updateFeedback({
        feedbackId: feedback.id,
        spaceId: feedback.spaceId,
        isSpam: true,
        sentiment: "",
        spamStatus: "COMPLETED",
        sentimentStatus: "COMPLETED",
      });
      return;
    }

    console.log(feedback.isSentimentEnabled, feedback.isSpamEnabled);

    const messageToAnalyze = generateForTextFeedback(feedback);

    if (feedback.isSpamEnabled) {
      isSpam = await analyzeSpam(messageToAnalyze);
      console.log("Spam analysis result:", isSpam);
    }

    if (feedback.isSentimentEnabled) {
      sentiment = await analyzeSentiment(messageToAnalyze);
      console.log("Sentiment analysis result:", sentiment);
    }

    await updateFeedback({
      feedbackId: feedback.id,
      spaceId: feedback.spaceId,
      sentiment,
      isSpam,
      spamStatus: "COMPLETED",
      sentimentStatus: "COMPLETED",
    });
  } catch (error) {
    console.error("Error processing text message:", error);
    // Update status to FAILED on error
    try {
      const feedback = JSON.parse(message) as TextFeedback;
      await updateFeedback({
        feedbackId: feedback.id,
        spaceId: feedback.spaceId,
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
