const {
  DynamoDBDocumentClient,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const STOCKS_TABLE = process.env.STOCKS_TABLE;

const client = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: process.env.AWS_REGION })
);

const getAllStocks = async () => {
  const { Items: stocks } = await client.send(
    new ScanCommand({ TableName: STOCKS_TABLE })
  );
  return stocks;
};

module.exports = { getAllStocks };
