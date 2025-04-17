import { openAiClient } from "./client";
import fs from "fs";

export const getVideoTranscription = async (videoUrl: string) => {
  try {
    const transcription = await openAiClient.audio.transcriptions.create({
      model: "gpt-4o-transcribe",
      file: fs.createReadStream(videoUrl),
      response_format: "text",
    });

    return transcription;
  } catch (error) {
    console.error("VIDEO_TRANSCRIPTION_ERROR", error);
    throw new Error("Failed to transcribe video");
  }
};
