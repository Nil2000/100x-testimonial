import axios from "axios";

export const updateFeedback = async (data: {
  feedbackId: string;
  spaceId: string;
  sentiment?: string;
  isSpam: boolean;
  analysisStatus: string;
}) => {
  try {
    await axios.put(`${process.env.APP_URL}/api/update_feedback/`, data, {
      headers: {
        Authorization: `Bearer ${process.env.INTERNAL_API_KEY}`,
      },
    });
  } catch (error) {
    console.error("Error updating feedback via API:", error);
    throw error;
  }
};
