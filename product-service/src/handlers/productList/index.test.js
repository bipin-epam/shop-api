const { handler } = require(".");

jest.mock("../../database/productTable");
jest.mock("../../database/stockTable");

let { getAllProducts } = require("../../database/productTable");
let { getAllStocks } = require("../../database/stockTable");

const products = require("../../../data/products");
const stocks = require("../../../data/stocks");

describe("Product List", () => {
  beforeAll(() => {
    getAllProducts.mockResolvedValue(products);
    getAllStocks.mockResolvedValue(stocks);
  });

  it("returns status 200 when called", async () => {
    const { statusCode, body } = await handler();
    expect(statusCode).toBe(200);
  });

  it("returns array of product as result", async () => {
    const { body } = await handler();
    const { data } = JSON.parse(body);

    expect(data).toEqual(expect.any(Array));
  });

  it("returns stock value in the products", async () => {
    const { body } = await handler();
    const { data } = JSON.parse(body);
    const product = data[0];
    expect(product).toHaveProperty("count");

    const { count: expectedCount } = stocks.find(
      (x) => x.product_id === product.id
    );
    expect(product.count).toEqual(expectedCount);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
