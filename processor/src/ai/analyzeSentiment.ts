import { OPENROUTER_API_URL, OPENROUTER_TEXT_MODEL } from "../constants";

export const analyzeSentiment = async (message: string) => {
  try {
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as any;

    if (data.error) {
      throw new Error(data.error.message);
    }

    const result = data.choices?.[0]?.message?.content?.toUpperCase().trim();

    // Validate the result is one of the expected values
    if (
      result === "POSITIVE" ||
      result === "NEGATIVE" ||
      result === "NEUTRAL"
    ) {
      return result as "POSITIVE" | "NEGATIVE" | "NEUTRAL";
    } else {
      // Fallback to neutral if unexpected response
      console.warn(
        `Unexpected sentiment result: ${result}, defaulting to NEUTRAL`
      );
      return "NEUTRAL";
    }
  } catch (error) {
    console.error("SENTIMENT_ANALYSIS_ERROR", error);
    throw new Error("Failed to analyze sentiment");
  }
};
