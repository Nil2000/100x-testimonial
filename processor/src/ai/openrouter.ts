export type OpenRouterChatCompletion = {
  error?: { message: string };
  choices?: Array<{
    message?: { content?: string };
  }>;
};
