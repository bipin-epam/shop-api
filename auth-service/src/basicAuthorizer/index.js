const generatePolicy = (allow) => {
  return {
    principalId: "token",
    policyDocument: {
      Version: "2012-10-17",
      Statement: {
        Action: "execute-api:Invoke",
        Effect: allow ? "Allow" : "Deny",
        Resource: "*",
      },
    },
  };
};

module.exports.handler = async (event) => {
  const {
    headers: { authorization },
  } = event;

  const token = authorization.split(" ")[1];

  const decodedBuffer = Buffer.from(token, "base64");
  const decodedToken = decodedBuffer.toString("utf-8");

  const toCheck = decodedToken.split("=");

  const password = process.env[toCheck[0]];

  if (password === toCheck[1]) {
    return generatePolicy(true);
  } else {
    return generatePolicy(false);
  }
};
