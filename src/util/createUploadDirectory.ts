import fs from "fs";
import * as path from "path";

const createUploadDirectory = () => {
  const rootDir = path.join(__dirname, "..", "..", "uploads");
  try {
    fs.readdirSync(rootDir);
  } catch (e) {
    fs.mkdirSync(rootDir);
  }
};

export default createUploadDirectory;
