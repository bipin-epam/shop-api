const { handler } = require(".");

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { PRODUCT_SAVED } = require("../../constants/responses");

jest.mock("@aws-sdk/client-dynamodb", () => {
  return {
    DynamoDBClient: jest.fn().mockImplementation(() => {
      return {};
    }),
  };
});
jest.mock("@aws-sdk/lib-dynamodb", () => {
  return {
    DynamoDBDocumentClient: {
      from: jest.fn().mockImplementation(() => {
        return {
          send: jest.fn().mockImplementation((command) => {
            return Promise.resolve({});
          }),
        };
      }),
    },
    PutCommand: jest.fn().mockImplementation(() => {
      return { name: "PutCommand" };
    }),
  };
});

const dummyProduct = {
  title: "Product Name",
  description: "Product Description",
  price: 10.99,
};

describe("Create Product Lambda", () => {
  it("should create a product", async () => {
    const event = {
      body: JSON.stringify(dummyProduct),
    };

    const { statusCode, body } = await handler(event);
    const { data } = JSON.parse(body);

    expect(statusCode).toBe(201);
    expect(PutCommand).toHaveBeenCalled();

    expect(data.title).toEqual(dummyProduct.title);
    expect(data.price).toEqual(dummyProduct.price);
    expect(data.description).toEqual(dummyProduct.description);
  });
});
