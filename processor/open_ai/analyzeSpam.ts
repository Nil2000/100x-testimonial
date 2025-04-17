import { openAiClient } from "./client";

export const analyzeSpam = async (message: string) => {
  const response = await openAiClient.responses.create({
    model: "gpt-3.5-turbo",
    instructions: "Answer with yes or no. Is this message spam?",
    input: message,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  if (response.output_text === "yes") {
    return true;
  } else if (response.output_text === "no") {
    return false;
  }
};
