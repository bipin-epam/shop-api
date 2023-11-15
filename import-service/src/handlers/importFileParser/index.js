const {
  copyFile,
  removeFile,
  getFileFromS3,
} = require("../../clients/s3Client");

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
  const { Records } = event;
  const {
    s3: {
      bucket: { name: bucketName },
      object: { key: objectKey },
    },
  } = Records[0];

  try {
    const result = await getFileFromS3(bucketName, objectKey);
    const products = await streamRead(result);
    await sendProductToQueue(products);

    const fileName = objectKey.split("/")[1];

    await copyFile(
      `${bucketName}/${objectKey}`,
      bucketName,
      `parsed/${fileName}`
    );

    await removeFile(bucketName, objectKey);
  } catch (error) {
    console.error("Error fetching the object from S3:", error);
  }
};
