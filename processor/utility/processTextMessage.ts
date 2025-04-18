import axios from "axios";
import { analyzeSentiment } from "../src/open_ai/analyzeSentiment";
import { analyzeSpam } from "../src/open_ai/analyzeSpam";
import type { TextFeedback } from "../src/types";
import { updateFeedback } from "./updateFeedback";

const generateForTextFeedback = (feedback: TextFeedback) => {
  return `feedback: ${feedback.answer}, name: ${feedback.name}, email: ${feedback.email}`;
};

export const processTextMessage = async (message: string) => {
  try {
    const feedback = JSON.parse(message) as TextFeedback;

    if (!feedback.answer) {
      await updateFeedback({
        feedbackId: feedback.id,
        spaceId: feedback.spaceId,
        isSpam: true,
        analysisStatus: "COMPLETED",
      });
    }

    const messageToAnalyze = generateForTextFeedback(feedback);

    const isSpam = await analyzeSpam(messageToAnalyze);

    if (isSpam) {
      await updateFeedback({
        feedbackId: feedback.id,
        spaceId: feedback.spaceId,
        isSpam: true,
        analysisStatus: "COMPLETED",
      });
      return;
    }

    const sentiment = await analyzeSentiment(messageToAnalyze);

    await updateFeedback({
      feedbackId: feedback.id,
      spaceId: feedback.spaceId,
      sentiment,
      isSpam: false,
      analysisStatus: "COMPLETED",
    });
  } catch (error) {
    console.error("Error processing text message:", error);
  }
};
