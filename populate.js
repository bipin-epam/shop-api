const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const {
  DynamoDBDocumentClient,
  TransactWriteCommand,
} = require("@aws-sdk/lib-dynamodb");

const products = [
  {
    id: "1",
    title: "product 1",
    description: "product 1 is just amazing, buy it!",
    price: 1000,
  },
  {
    id: "2",
    title: "product 2",
    description: "product 2 is just amazing, buy it!",
    price: 2000,
  },
  {
    id: "3",
    title: "product 3",
    description: "product 3 is just amazing, buy it!",
    price: 3000,
  },
  {
    id: "4",
    title: "product 4",
    description: "product 4 is just amazing, buy it!",
    price: 4000,
  },
];

const stocks = [
  {
    product_id: "1",
    count: 10,
  },
  {
    product_id: "2",
    count: 30,
  },
  {
    product_id: "4",
    count: 1,
  },
];

const PRODUCTS_TABLE_NAME = "products";
const STOCKS_TABLE_NAME = "stocks";

const addRecordToParams = (params, item, tableName) => {
  params.TransactItems.push({
    Put: { Item: item, TableName: tableName },
  });
};

const addStockDataForTransaction = (params, productId) => {
  const stockRecord = stocks.find(({ product_id }) => product_id === productId);

  if (stockRecord) {
    addRecordToParams(params, stockRecord, STOCKS_TABLE_NAME);
  }
};

const buildTransactionQuery = () => {
  let params = { TransactItems: [] };

  for (const product of products) {
    addRecordToParams(params, product, PRODUCTS_TABLE_NAME);
    addStockDataForTransaction(params, product.id);
  }

  return new TransactWriteCommand(params);
};

const insertDataInDb = async () => {
  const cmd = buildTransactionQuery();
  const client = DynamoDBDocumentClient.from(
    new DynamoDBClient({ region: "ap-south-1" })
  );

  await client.send(cmd);
};

(async () => {
  try {
    await insertDataInDb();
    console.log("Successfull entered data in dynamo tables!");
  } catch (e) {
    console.log(`Error while entering data in DynamoDB Tables`);
    console.log(e);
  }
})();
