import { HttpError, withRetry } from "./retry";

export const updateFeedback = async (data: {
  feedbackId: string;
  spaceId: string;
  sentiment?: string;
  isSpam: boolean;
  spamStatus: string;
  sentimentStatus: string;
}) => {
  await withRetry(
    async () => {
      const response = await fetch(
        `${process.env.APP_URL}/api/update_feedback/`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.INTERNAL_API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new HttpError(
          `HTTP error! status: ${response.status}`,
          response.status
        );
      }

      console.log("Feedback updated successfully");
    },
    { label: "update_feedback callback" }
  );
};
