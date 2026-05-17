import { OPENROUTER_API_URL, OPENROUTER_VIDEO_MODEL } from "../constants";
import type { OpenRouterChatCompletion } from "./openrouter";

export const getVideoTranscription = async (videoUrl: string) => {
  try {
    console.log(`Transcribing video: ${videoUrl}`);

    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("OpenRouter API key is not set");
    }

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENROUTER_VIDEO_MODEL,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Provide a detailed transcription of the video content.",
              },
              {
                type: "video_url",
                video_url: {
                  url: videoUrl,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = (await response.json()) as OpenRouterChatCompletion;
      console.log(error);
      console.error("API Error:", error.error?.message);
      throw new Error(error.error?.message ?? "OpenRouter request failed");
    }

    const data = (await response.json()) as OpenRouterChatCompletion;
    console.log("Transcription response:", JSON.stringify(data, null, 2));
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("No transcription returned from OpenRouter");
    }
    return content;
  } catch (error) {
    console.error("VIDEO_TRANSCRIPTION_ERROR", error);
    throw new Error("Failed to transcribe video");
  }
};
