const { handler } = require(".");
const { INVALID_REQUEST } = require("../../constants/response");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

jest.mock("@aws-sdk/s3-request-presigner");

describe("ImportProductsFile", () => {
  it("returns 400 for invalid filename", async () => {
    const event = {
      queryStringParameters: {},
    };

    const { statusCode, body } = await handler(event);
    const { message } = JSON.parse(body);
    expect(statusCode).toBe(400);
    expect(message).toEqual(INVALID_REQUEST);
  });

  it("return 400 if no queryParameter is passed", async () => {
    const event = {};

    const { statusCode, body } = await handler(event);
    const { message } = JSON.parse(body);
    expect(statusCode).toBe(400);
    expect(message).toEqual(INVALID_REQUEST);
  });

  it("should generate a signed URL for valid input", async () => {
    const file = "example.csv";
    const expectedKey = "uploaded/example.csv";

    const event = {
      queryStringParameters: { name: file },
    };

    const expectedURL = "https://testurl.com";

    getSignedUrl.mockImplementation((client, cmd) => {
      expect(cmd).toBeInstanceOf(PutObjectCommand);
      expect(cmd.input.Key).toEqual(expectedKey);
      return expectedURL;
    });

    const response = await handler(event);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).data).toEqual(expectedURL);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
