const {
  DynamoDBDocumentClient,
  ScanCommand,
  QueryCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const { v4 } = require("uuid");
const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE ?? "products";

const client = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: process.env.AWS_REGION })
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

const createProduct = async ({ title, description, price }) => {
  const id = v4();
  const item = {
    id,
    title,
    description,
    price,
  };
  await client.send(
    new PutCommand({
      TableName: PRODUCTS_TABLE,
      Item: item,
      ConditionExpression: "attribute_not_exists(id)",
    })
  );

  return item;
};
//#endregion

module.exports = { getAllProducts, getProduct, createProduct };
