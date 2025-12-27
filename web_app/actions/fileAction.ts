"use server";

import { initClient } from "@/lib/storage/initClient";
import { parseS3PublicBaseUrl } from "@/lib/storage/parseS3publicBaseUrl";

type UploadFileToBucketProps = {
  file: File;
  key: string;
  mimeType: string;
  size: number;
};

export const uploadFileToBucket = async ({
  file,
  key,
  mimeType,
  size,
}: UploadFileToBucketProps) => {
  const s3client = initClient();

  if (!process.env.S3_BUCKET) {
    throw new Error("S3_BUCKET is not defined");
  }
  const filebuffer = Buffer.from((await file.arrayBuffer()) as ArrayBuffer);
  try {
    await s3client.putObject(
      process.env.S3_BUCKET!,
      "public/" + key,
      filebuffer,
      size,
      {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=86400",
      }
    );

    return {
      key,
      url: `${parseS3PublicBaseUrl()}/public/${key}`,
    };
  } catch (error) {
    return {
      error,
    };
  }
};

type GetFileTempUrlProps = {
  key: string;
  expires?: number;
};

export const getFileTempUrl = async ({ key, expires }: GetFileTempUrlProps) => {
  const s3client = initClient();
  return s3client.presignedGetObject(
    process.env.S3_BUCKET!,
    key,
    expires ?? 24 * 3600
  );
};
