import { OPENROUTER_API_URL, OPENROUTER_VIDEO_MODEL } from "../constants";

export const getVideoTranscription = async (videoUrl: string) => {
  try {
    console.log(`Transcribing video: ${videoUrl}`);

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
        model: OPENROUTER_VIDEO_MODEL,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Provide a detailed transcription of the video content.",
              },
              {
                type: "video_url",
                video_url: {
                  url: videoUrl,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Transcription response:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("VIDEO_TRANSCRIPTION_ERROR", error);
    throw new Error("Failed to transcribe video");
  }
};
