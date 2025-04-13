export const parseS3PublicBaseUrl = () =>
  process.env.S3_PUBLIC_CUSTOM_DOMAIN
    ? process.env.S3_PUBLIC_CUSTOM_DOMAIN
    : `http${process.env.S3_SSL === "true" ? "s" : ""}://${
        process.env.S3_ENDPOINT
      }${process.env.S3_PORT ? `:${process.env.S3_PORT}` : ""}/${
        process.env.S3_BUCKET
      }`;
