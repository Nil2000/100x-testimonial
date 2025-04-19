import { openAiClient } from "./client";

export const analyzeSpam = async (message: string) => {
  const response = await openAiClient.responses.create({
    model: process.env.OPENAI_TEXT_MODEL || "gpt-3.5-turbo",
    instructions:
      "Determine if the following testimonial submission is spam or not.Respond with one word only: 'yes' or 'no'",
    input: message,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  if (response.output_text.toLocaleLowerCase().includes("yes")) {
    return true;
  } else {
    return false;
  }
};
