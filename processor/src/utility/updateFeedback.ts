export const updateFeedback = async (data: {
  feedbackId: string;
  spaceId: string;
  sentiment?: string;
  isSpam: boolean;
  analysisStatus: string;
}) => {
  try {
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Feedback updated successfully:", result);
  } catch (error) {
    console.error("Error updating feedback via API:", error);
    throw error;
  }
};
