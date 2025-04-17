import { openAiClient } from "./client";

export const analyzeSentiment = async (message: string) => {
  const response = await openAiClient.responses.create({
    model: "gpt-3.5-turbo",
    instructions:
      "Answer in one word positive, negative, or neutral. What is the sentiment of this message?",
    input: message,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.output_text;
};
