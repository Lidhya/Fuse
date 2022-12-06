require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const bucketName = process.env.S3_NAME;
const region = process.env.S3_REGION;
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
function uploadFile(file) {
  try {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename,
    };

    return s3.upload(uploadParams).promise();
  } catch (error) {
    return "Something went wrong";
  }
}

function S3delete(filename) {
  try {
    return s3.deleteObject({ Bucket: bucketName, Key: filename }).promise();
  } catch (error) {
    return "Something went wrong";
  }
}
exports.uploadFile = uploadFile;
exports.S3delete = S3delete;
