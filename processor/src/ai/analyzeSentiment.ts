import { OPENROUTER_API_URL, OPENROUTER_TEXT_MODEL } from "../constants";
import { HttpError, withRetry } from "../utility/retry";

export const analyzeSentiment = async (message: string) => {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OpenRouter API key is not set");
  }

  return withRetry(
    async () => {
      const response = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: OPENROUTER_TEXT_MODEL,
          messages: [
            {
              role: "user",
              content: `Answer in one word: positive, negative, or neutral. What is the sentiment of this message?

Message: ${message}`,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new HttpError(
          `HTTP error! status: ${response.status}`,
          response.status
        );
      }

      const data = (await response.json()) as {
        error?: { message?: string };
        choices?: Array<{ message?: { content?: string } }>;
      };

      if (data.error) {
        throw new Error(data.error.message ?? "OpenRouter API error");
      }

      const result = data.choices?.[0]?.message?.content?.toUpperCase().trim();

      if (
        result === "POSITIVE" ||
        result === "NEGATIVE" ||
        result === "NEUTRAL"
      ) {
        return result as "POSITIVE" | "NEGATIVE" | "NEUTRAL";
      }

      console.warn(
        `Unexpected sentiment result: ${result}, defaulting to NEUTRAL`
      );
      return "NEUTRAL" as const;
    },
    { label: "sentiment analysis" }
  ).catch((error) => {
    console.error("SENTIMENT_ANALYSIS_ERROR", error);
    throw new Error("Failed to analyze sentiment");
  });
};
