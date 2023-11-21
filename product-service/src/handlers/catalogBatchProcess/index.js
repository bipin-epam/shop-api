const { publishToSNS } = require("../../clients/snsClient");
const { createProduct } = require("../../database/productTable");

module.exports.handler = async (event) => {
  const { SNS_ARN } = process.env;
  const { Records } = event;

  if (Records.length <= 0) {
    console.log("No data in the records!");
    return;
  }
  try {
    let maxPrice = Number.MIN_VALUE;

    for (const record of Records) {
      const products = JSON.parse(record.body);
      for (const product of products) {
        const { price } = product;
        if (+price > maxPrice) {
          maxPrice = +price;
        }
        await createProduct(product);
      }
    }
    console.log(maxPrice);
    await publishToSNS(`Products added to dynamoDB`, SNS_ARN, maxPrice);
  } catch (e) {
    console.log("Error while saving records!");
  }
};
