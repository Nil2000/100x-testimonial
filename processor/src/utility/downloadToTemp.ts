import fs from "fs";
import download from "download";

export const downloadToTemp = async (url: string) => {
  const fileType = url.split(".").pop() || "mp4";
  const fileName = `tempFile_${Date.now()}.${fileType}`;
  const filePath = `./temp/`;

  await download(url, "./temp", {
    filename: fileName,
  });

  return filePath + fileName;
};

export const deleteTempFile = (fileName: string) => {
  fs.unlink(fileName, (err) => {
    if (err) {
      console.error("Error deleting temp file:", err);
    } else {
      console.log("Temp file deleted successfully:", fileName);
    }
  });
};
