import { OPENROUTER_API_URL, OPENROUTER_VIDEO_MODEL } from "../constants";
import { HttpError, withRetry } from "../utility/retry";
import type { OpenRouterChatCompletion } from "./openrouter";

export const getVideoTranscription = async (videoUrl: string) => {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OpenRouter API key is not set");
  }

  return withRetry(
    async () => {
      console.log(`Transcribing video: ${videoUrl}`);

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
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorBody = (await response.json()) as OpenRouterChatCompletion;
          if (errorBody.error?.message) {
            errorMessage = errorBody.error.message;
          }
        } catch {
          // Use default HTTP error message when body is not JSON.
        }
        throw new HttpError(errorMessage, response.status);
      }

      const data = (await response.json()) as OpenRouterChatCompletion;

      if (data.error) {
        throw new Error(data.error.message ?? "OpenRouter request failed");
      }

      console.log("Transcription response:", JSON.stringify(data, null, 2));
      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error("No transcription returned from OpenRouter");
      }
      return content;
    },
    { label: "video transcription" },
  ).catch((error) => {
    console.error("VIDEO_TRANSCRIPTION_ERROR", error);
    throw new Error("Failed to transcribe video");
  });
};
