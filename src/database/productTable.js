const {
  DynamoDBDocumentClient,
  ScanCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const { REGION } = require("../constants/config");
const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE ?? "products";

const client = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: REGION })
);

// #region handlers definition...

const getAllProducts = async () => {
  const { Items: products } = await client.send(
    new ScanCommand({ TableName: PRODUCTS_TABLE })
  );
  return products;
};

const getProduct = async (id) => {
  const { Items: products } = await client.send(
    new QueryCommand({
      TableName: PRODUCTS_TABLE,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id,
      },
    })
  );
  return products[0];
};
//#endregion

module.exports = { getAllProducts, getProduct };
