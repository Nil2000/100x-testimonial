import { openAiClient } from "./client";
import fs from "fs";

export const getVideoTranscription = async (filePathUrl: string) => {
  try {
    const transcription = await openAiClient.audio.transcriptions.create({
      model: process.env.OPENAI_TRANSCRIPT_MODEL || "gpt-4o-transcribe",
      file: fs.createReadStream(filePathUrl),
      response_format: "text",
    });

    return transcription;
  } catch (error) {
    console.error("VIDEO_TRANSCRIPTION_ERROR", error);
    throw new Error("Failed to transcribe video");
  }
};
