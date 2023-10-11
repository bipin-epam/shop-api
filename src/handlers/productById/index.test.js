const { handler } = require("./index");
const products = require("../../../data/products");
const { PRODUCT_NOT_FOUND } = require("../../constants/responses");

const mockValidEvent = {
  pathParameters: { id: products[0].id },
};
const mockInvalidEvent = {
  pathParameters: { id: "xxx" },
};

describe("GetProductById", () => {
  it("returns status 200 when called with expected eventParameter", async () => {
    const { statusCode } = await handler(mockValidEvent);
    expect(statusCode).toBe(200);
  });

  it("returns product with correct id", async () => {
    const { body } = await handler(mockValidEvent);
    const { data } = JSON.parse(body);
    expect(data).toEqual(products[0]);
  });

  it("returns error with invalid product id", async () => {
    const { statusCode, body } = await handler(mockInvalidEvent);
    expect(statusCode).toBe(404);

    const { message } = JSON.parse(body);
    expect(message).toEqual(PRODUCT_NOT_FOUND);
  });
});
