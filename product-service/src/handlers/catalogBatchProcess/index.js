const { publishToSNS } = require("../../clients/snsClient");
const { createProduct } = require("../../database/productTable");

module.exports.handler = async (event) => {
  const { SNS_ARN } = process.env;
  const { Records } = event;
  console.log(Records);
  for (const record of Records) {
    const products = JSON.parse(record.body);
    for (const product of products) {
      await createProduct(product);
    }
  }
  await publishToSNS(`Products added to dynamoDB`, SNS_ARN);
};
