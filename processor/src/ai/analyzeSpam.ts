import { OPENROUTER_API_URL, OPENROUTER_TEXT_MODEL } from "../constants";

export const analyzeSpam = async (message: string) => {
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
            content: `Determine if the following testimonial submission is spam or not. Respond with one word only: 'yes' or 'no'

Testimonial: ${message}`,
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

    const result = data.choices?.[0]?.message?.content?.toLowerCase().trim();

    if (result?.includes("yes")) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("SPAM_ANALYSIS_ERROR", error);
    throw new Error("Failed to analyze spam");
  }
};
