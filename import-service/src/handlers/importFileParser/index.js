const { client } = require("../../clients/s3Client");
const { GetObjectCommand } = require("@aws-sdk/client-s3");

const csv = require("csv-parser");

module.exports.handler = async (event) => {
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
    const content = [];
    const result = (await client.send(getObjectCommand)).Body;
    result
      .pipe(csv())
      .on("data", (row) => {
        console.log("Read a row...");
        console.log(row);
        content.push(row);
      })
      .on("end", () => {
        console.log("***CSV parsing finished***");
        console.log(content);
      })
      .on("error", (err) => {
        console.error("Error while parsing the CSV:", err);
      });
  } catch (error) {
    console.error("Error fetching the object from S3:", error);
  }
};
