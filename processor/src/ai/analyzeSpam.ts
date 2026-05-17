import { OPENROUTER_API_URL, OPENROUTER_TEXT_MODEL } from "../constants";
import { HttpError, withRetry } from "../utility/retry";

export const analyzeSpam = async (message: string) => {
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
              content: `Determine if the following testimonial submission is spam or not. Respond with one word only: 'yes' or 'no'

Testimonial: ${message}`,
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

      const result = data.choices?.[0]?.message?.content?.toLowerCase().trim();

      if (result?.includes("yes")) {
        return true;
      }

      return false;
    },
    { label: "spam analysis" }
  ).catch((error) => {
    console.error("SPAM_ANALYSIS_ERROR", error);
    throw new Error("Failed to analyze spam");
  });
};
