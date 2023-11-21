"use strict";

const createSuccessResponse = require("../../common/createSuccessResponse");
const validateRequest = require("../../common/validateRequest");
const {
  PRODUCT_SAVED,
  INVALID_REQUEST,
  SOMETHING_WRONG,
} = require("../../constants/responses");
const { ValidationError } = require("joi");

const { createProduct } = require("../../database/productTable");
const { createSchema } = require("./schema");
const createInvalidRequest = require("../../common/createInvalidRequest");
const createError = require("../../common/createError");
const { buildInvalidationError } = require("../../utils/errorUtils");

module.exports.handler = async (event) => {
  const { body } = event;
  try {
    let requestData = JSON.parse(body);
    await validateRequest(createSchema, requestData);
    const product = await createProduct(requestData);
    return createSuccessResponse(PRODUCT_SAVED, product, 201);
  } catch (e) {
    if (e instanceof ValidationError) {
      return createInvalidRequest(INVALID_REQUEST, buildInvalidationError(e));
    }
    return createError(SOMETHING_WRONG);
  }
};
