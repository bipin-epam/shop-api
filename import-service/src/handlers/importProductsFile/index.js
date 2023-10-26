const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");

const { client } = require("../../clients/s3Client");

const UPLOAD_BUCKET = process.env.BUCKET_NAME;

module.exports.handler = async (event) => {
  console.log("Validate the request...");
  const {
    queryStringParameters: { fileName },
  } = event;

  console.log(`Received filename is : '${fileName}'`);

  const cmd = new GetObjectCommand({
    Bucket: UPLOAD_BUCKET,
    Key: `uploaded/${fileName}`,
  });
  const result = await getSignedUrl(client, cmd, { expiresIn: 300 }); //5 minutes
  console.log(result);

  return {};
};
