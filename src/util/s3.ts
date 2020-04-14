import AWS from "aws-sdk";
import * as fs from "fs";
import * as path from "path";

const connectAWS = () => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECURITY_KEY,
    region: "ap-south-1"
  });
};

const saveImage = async (image: any) => {
  const s3 = new AWS.S3();

  const imageName = image.filename;
  const bucket = "merch-shop-product-image";

  const pathToUploadImage = path.join(
    __dirname,
    "..",
    "..",
    "uploads",
    imageName
  );
  const file = fs.readFileSync(pathToUploadImage);

  return await s3
    .putObject({
      Bucket: bucket,
      Body: file,
      Key: imageName
    })
    .promise();
};

export { connectAWS, saveImage };
