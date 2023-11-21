const { handler } = require(".");
jest.mock("../../clients/snsClient", () => {
  return {
    publishToSNS: jest.fn().mockImplementation(() => {}),
  };
});

jest.mock("../../database/productTable", () => {
  return {
    createProduct: jest.fn().mockImplementation(() => {}),
  };
});

const { createProduct } = require("../../database/productTable");
const { publishToSNS } = require("../../clients/snsClient");

describe("CatalogBatchProcess", () => {
  it("should be callable without errors", async () => {
    const originalEnv = process.env;
    process.env = {
      SNS_ARN: "test-sns-arn",
      AWS_REGION: "test-region",
    };

    const sampleEvent = {
      Records: [
        {
          body: JSON.stringify([
            { title: "1", description: "d1", price: 1000 },
            { title: "2", description: "d2", price: 2000 },
          ]),
        },
      ],
    };

    await expect(handler(sampleEvent)).resolves.not.toThrow();
    process.env = originalEnv;
  });

  it("should handle empty event records", async () => {
    const originalEnv = process.env;
    process.env = {
      SNS_ARN: "test-sns-arn",
      AWS_REGION: "test-region",
    };

    const sampleEvent = {
      Records: [],
    };

    await expect(handler(sampleEvent)).resolves.not.toThrow();

    expect(createProduct).not.toHaveBeenCalled();
    expect(publishToSNS).not.toHaveBeenCalled();

    process.env = originalEnv;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
});
