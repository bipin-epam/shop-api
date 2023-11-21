const {
  S3Client,
  PutObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const client = new S3Client({ region: process.env.AWS_REGION });

const UPLOAD_BUCKET = process.env.BUCKET_NAME;

const getPresignedURL = async (name) => {
  console.log(`Received filename is : '${name}'`);

  const cmd = new PutObjectCommand({
    Bucket: UPLOAD_BUCKET,
    Key: `uploaded/${name}`,
  });

  const result = await getSignedUrl(client, cmd, { expiresIn: 3600 });
  return result;
};

const copyFile = async (source, bucketName, destinationKey) => {
  await client.send(
    new CopyObjectCommand({
      CopySource: source,
      Bucket: bucketName,
      Key: destinationKey,
    })
  );
};

const removeFile = async (bucketName, key) => {
  await client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));
};

const getFileFromS3 = async (bucketName, objectKey) => {
  const getObjectCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });
  return (await client.send(getObjectCommand)).Body;
};

module.exports = {
  client,
  getPresignedURL,
  copyFile,
  removeFile,
  getFileFromS3,
};
