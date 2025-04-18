import fs from "fs";
import download from "download";

export const downloadToTemp = async (url: string) => {
  const fileType = url.split(".").pop() || "mp4";
  const fileName = __dirname + `/temp/tempfile.${fileType}`;
  const file = fs.createWriteStream(fileName);

  fs.writeFileSync(fileName, await download(url));

  return fileName;
};
