const { handler } = require("./index");

describe("Product List", () => {
  it("returns status 200 when called", async () => {
    const { statusCode } = await handler();
    expect(statusCode).toBe(200);
  });

  it("returns array of product as result", async () => {
    const { body } = await handler();
    const { data } = JSON.parse(body);

    expect(data).toEqual(expect.any(Array));
  });
});
