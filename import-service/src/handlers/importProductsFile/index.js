const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

const { client } = require("../../clients/s3Client");
const createSuccessReponse = require("../../common/createSuccessReponse");
const { SUCCESS } = require("../../constants/response");

const UPLOAD_BUCKET = process.env.BUCKET_NAME;

module.exports.handler = async (event) => {
  console.log("Validate the request...");
  const {
    queryStringParameters: { name },
  } = event;

  console.log(`Received filename is : '${name}'`);

  const cmd = new PutObjectCommand({
    Bucket: UPLOAD_BUCKET,
    Key: `uploaded/${name}`,
  });
  const result = await getSignedUrl(client, cmd, { expiresIn: 3600 });
  console.log(result);
  return createSuccessReponse(SUCCESS, result, 200);
};
