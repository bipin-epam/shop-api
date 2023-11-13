const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

const { client } = require("../../clients/s3Client");
const createSuccessReponse = require("../../common/createSuccessReponse");
const { SUCCESS, INVALID_REQUEST } = require("../../constants/response");
const createInvalidRequest = require("../../common/createInvalidRequest");

const UPLOAD_BUCKET = process.env.BUCKET_NAME;

const returnInvalidRequest = () => {
  return createInvalidRequest(
    INVALID_REQUEST,
    new Error('Filename missing as "name" parameter'),
    400
  );
};

module.exports.handler = async (event) => {
  const { queryStringParameters } = event;

  if (!queryStringParameters) return returnInvalidRequest();

  const { name } = queryStringParameters;

  if (!name) return returnInvalidRequest();

  console.log(`Received filename is : '${name}'`);

  const cmd = new PutObjectCommand({
    Bucket: UPLOAD_BUCKET,
    Key: `uploaded/${name}`,
  });
  const result = await getSignedUrl(client, cmd, { expiresIn: 3600 });
  console.log(result);
  return createSuccessReponse(SUCCESS, result, 200);
};
