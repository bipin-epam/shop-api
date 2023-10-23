"use strict";

const createError = require("../../common/createError");
const createNotFoundResponse = require("../../common/createNotFoundResponse");
const createSuccessResponse = require("../../common/createSuccessResponse");
const {
  PRODUCT_NOT_FOUND,
  PRODUCT_FOUND,
  SOMETHING_WRONG,
} = require("../../constants/responses");
const { getProduct } = require("../../database/productTable");

module.exports.handler = async (event) => {
  try {
    const {
      pathParameters: { id },
    } = event;

    const product = await getProduct(id);

    if (!product) return createNotFoundResponse(PRODUCT_NOT_FOUND);

    return createSuccessResponse(PRODUCT_FOUND, product, 200);
  } catch (e) {
    return createError(SOMETHING_WRONG);
  }
};
