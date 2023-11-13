const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");

const client = new SQSClient({ region: process.env.AWS_REGION });
const QueueUrl = process.env.QUEUE_URL;

const sendProductToQueue = async (product) => {
  console.log("To Send");
  console.log(product);
  console.log(QueueUrl);
  console.log(client);

  try {
    const cmd = new SendMessageCommand({
      QueueUrl,
      MessageBody: JSON.stringify(product),
    });
    const result = await client.send(cmd);
    return result;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { sendProductToQueue };
