import { HttpError, withRetry } from "../retry";
import { initClient } from "./initClient";
import { parseS3PublicBaseUrl } from "./parseS3publicBaseUrl";

// Upload image to S3 storage
export const uploadImageToS3 = async (
  imageUrl: string,
  mediaKey: string,
  spaceId: string
): Promise<string> => {
  const s3Client = initClient();
  const bucketName = process.env.S3_BUCKET!;

  return withRetry(
    async () => {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new HttpError(
          `Failed to download image: ${response.statusText}`,
          response.status
        );
      }

      const imageBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(imageBuffer);
      const fileName = `/public/space/${spaceId}/twitter-media/${mediaKey}.jpg`;

      await s3Client.putObject(bucketName, fileName, buffer, buffer.length, {
        "Content-Type": "image/jpeg",
      });

      const baseUrl = parseS3PublicBaseUrl();
      return `${baseUrl}/${fileName}`;
    },
    { label: "upload image to S3" }
  ).catch((error) => {
    console.error("Error uploading image to S3:", error);
    throw error;
  });
};

// Upload video to S3 storage
export const uploadVideoToS3 = async (
  videoUrl: string,
  mediaKey: string,
  spaceId: string
): Promise<string> => {
  const s3Client = initClient();
  const bucketName = process.env.S3_BUCKET!;

  return withRetry(
    async () => {
      const response = await fetch(videoUrl);
      if (!response.ok) {
        throw new HttpError(
          `Failed to download video: ${response.statusText}`,
          response.status
        );
      }

      const videoBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(videoBuffer);
      const fileName = `/public/space/${spaceId}/twitter-media/${mediaKey}.mp4`;

      await s3Client.putObject(bucketName, fileName, buffer, buffer.length, {
        "Content-Type": "video/mp4",
      });

      const baseUrl = parseS3PublicBaseUrl();
      return `${baseUrl}/${fileName}`;
    },
    { label: "upload video to S3" }
  ).catch((error) => {
    console.error("Error uploading video to S3:", error);
    throw error;
  });
};
