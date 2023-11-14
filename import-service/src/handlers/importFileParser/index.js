const { client } = require("../../clients/s3Client");
const {
  GetObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const csv = require("csv-parser");
const { sendProductToQueue } = require("../../clients/sqsClient");

const streamRead = async (result) => {
  const content = [];

  return new Promise((res, rej) => {
    result
      .pipe(csv())
      .on("data", (row) => {
        content.push(row);
      })
      .on("end", () => {
        res(content);
      })
      .on("error", (err) => {
        console.error("Error while parsing the CSV:", err);
        rej("Error while parsing the csv");
      });
  });
};

module.exports.handler = async (event) => {
  const { QUEUE_NAME } = process.env;

  const { Records } = event;
  const {
    s3: {
      bucket: { name: bucketName },
      object: { key: objectKey },
    },
  } = Records[0];

  const getObjectCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });

  try {
    const result = (await client.send(getObjectCommand)).Body;
    const products = await streamRead(result);
    await sendProductToQueue(products);

    const fileName = objectKey.split("/")[1];

    await client.send(
      new CopyObjectCommand({
        CopySource: `${bucketName}/${objectKey}`,
        Bucket: bucketName,
        Key: `parsed/${fileName}`,
      })
    );

    await client.send(
      new DeleteObjectCommand({ Bucket: bucketName, Key: objectKey })
    );
  } catch (error) {
    console.error("Error fetching the object from S3:", error);
  }
};
