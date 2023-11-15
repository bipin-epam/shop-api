const { getPresignedURL } = require("../../clients/s3Client");
const createSuccessReponse = require("../../common/createSuccessReponse");
const { SUCCESS, INVALID_REQUEST } = require("../../constants/response");
const createInvalidRequest = require("../../common/createInvalidRequest");

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

  const result = await getPresignedURL(name);
  return createSuccessReponse(SUCCESS, result, 200);
};
