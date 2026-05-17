"use server";

import {
  assertPublishedSpaceByName,
  assertSpaceOwnership,
  assertSpaceOwnershipByName,
  requireAuth,
} from "@/lib/authGuards";
import { withRetry } from "@/lib/retry";
import { initClient } from "@/lib/storage/initClient";
import { parseS3PublicBaseUrl } from "@/lib/storage/parseS3publicBaseUrl";

type UploadValidation =
  | { type: "auth-only" }
  | { type: "space-owner"; spaceId: string }
  | { type: "space-owner-by-name"; spaceName: string }
  | { type: "public-space"; spaceName: string };

type UploadFileToBucketProps = {
  file: File;
  key: string;
  mimeType: string;
  size: number;
  validation?: UploadValidation;
};

async function assertUploadAllowed(validation: UploadValidation) {
  switch (validation.type) {
    case "auth-only": {
      const authResult = await requireAuth();
      if ("error" in authResult) {
        return authResult;
      }
      return authResult;
    }
    case "space-owner": {
      const authResult = await requireAuth();
      if ("error" in authResult) {
        return authResult;
      }
      return assertSpaceOwnership(authResult.userId, validation.spaceId);
    }
    case "space-owner-by-name": {
      const authResult = await requireAuth();
      if ("error" in authResult) {
        return authResult;
      }
      return assertSpaceOwnershipByName(authResult.userId, validation.spaceName);
    }
    case "public-space": {
      return assertPublishedSpaceByName(validation.spaceName);
    }
  }
}

export const uploadFileToBucket = async ({
  file,
  key,
  mimeType,
  size,
  validation = { type: "auth-only" },
}: UploadFileToBucketProps) => {
  const access = await assertUploadAllowed(validation);
  if ("error" in access) {
    return { error: access.error };
  }

  const s3client = initClient();

  if (!process.env.S3_BUCKET) {
    throw new Error("S3_BUCKET is not defined");
  }
  const filebuffer = Buffer.from((await file.arrayBuffer()) as ArrayBuffer);
  try {
    await withRetry(
      () =>
        s3client.putObject(
          process.env.S3_BUCKET!,
          "public/" + key,
          filebuffer,
          size,
          {
            "Content-Type": mimeType,
            "Cache-Control": "public, max-age=86400",
          }
        ),
      { label: "upload file to S3" }
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
  const authResult = await requireAuth();
  if ("error" in authResult) {
    throw new Error(authResult.error);
  }

  const s3client = initClient();
  return s3client.presignedGetObject(
    process.env.S3_BUCKET!,
    key,
    expires ?? 24 * 3600
  );
};
