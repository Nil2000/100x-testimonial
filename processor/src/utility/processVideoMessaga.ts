import { analyzeSentiment } from "../open_ai/analyzeSentiment";
import { analyzeSpam } from "../open_ai/analyzeSpam";
import { getVideoTranscription } from "../open_ai/getVIdeoTranscription";
import type { TextFeedback, VideoFeedback } from "../types";
import { deleteTempFile, downloadToTemp } from "./downloadToTemp";
import { updateFeedback } from "./updateFeedback";

const generateForTextFeedback = (feedback: TextFeedback) => {
  return `feedback: ${feedback.answer}, name: ${feedback.name}, email: ${feedback.email}`;
};

export const processVideoMessage = async (message: string) => {
  const videoMessage = JSON.parse(message) as VideoFeedback;

  const { videoUrl, name, email, spaceId } = videoMessage;

  const filePath = await downloadToTemp(videoUrl);

  console.log(`File downloaded to: ${filePath}`);

  const transcription = await getVideoTranscription(filePath);

  console.log(`Transcription: ${transcription}`);

  const messageToAnalyze = generateForTextFeedback({
    id: videoMessage.id,
    answer: transcription,
    name,
    email,
    spaceId,
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

    deleteTempFile(filePath);
    return;
  }

  const sentiment = await analyzeSentiment(transcription);

  console.log(`Sentiment Analysis: ${sentiment}`);

  await updateFeedback({
    feedbackId: videoMessage.id,
    spaceId,
    isSpam,
    sentiment,
    analysisStatus: "COMPLETED",
  });

  deleteTempFile(filePath);
};
