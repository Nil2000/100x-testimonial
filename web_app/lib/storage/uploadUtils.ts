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

  try {
    // Download the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    const imageBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);

    // Generate a unique filename
    const fileName = `/public/space/${spaceId}/twitter-media/${mediaKey}.jpg`;

    // Upload to S3
    await s3Client.putObject(bucketName, fileName, buffer, buffer.length, {
      "Content-Type": "image/jpeg",
    });

    // Return the public URL
    const baseUrl = parseS3PublicBaseUrl();
    return `${baseUrl}/${fileName}`;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error;
  }
};

// Upload video to S3 storage
export const uploadVideoToS3 = async (
  videoUrl: string,
  mediaKey: string,
  spaceId: string
): Promise<string> => {
  const s3Client = initClient();
  const bucketName = process.env.S3_BUCKET!;

  try {
    // Download the video
    const response = await fetch(videoUrl);
    if (!response.ok) {
      throw new Error(`Failed to download video: ${response.statusText}`);
    }

    const videoBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(videoBuffer);

    // Generate a unique filename - use .mp4 for videos
    const fileName = `/public/space/${spaceId}/twitter-media/${mediaKey}.mp4`;

    // Upload to S3
    await s3Client.putObject(bucketName, fileName, buffer, buffer.length, {
      "Content-Type": "video/mp4",
    });

    // Return the public URL
    const baseUrl = parseS3PublicBaseUrl();
    return `${baseUrl}/${fileName}`;
  } catch (error) {
    console.error("Error uploading video to S3:", error);
    throw error;
  }
};
