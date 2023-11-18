const { SNSClient } = require("@aws-sdk/client-sns");
const { PublishCommand } = require("@aws-sdk/client-sns");

const snsClient = new SNSClient({ region: process.env.AWS_REGION });

const publishToSNS = async (message, topicArn, maxPrice) => {
  const response = await snsClient.send(
    new PublishCommand({
      Message: message,
      TopicArn: topicArn,
      MessageAttributes: {
        maxPrice: {
          DataType: "Number",
          StringValue: `${maxPrice}`,
        },
      },
    })
  );
  return response;
};

module.exports = { publishToSNS };
