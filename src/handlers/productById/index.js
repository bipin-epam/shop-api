"use strict";

const createNotFoundResponse = require("../../common/createNotFoundResponse");
const createSuccessResponse = require("../../common/createSuccessResponse");
const {
  PRODUCT_NOT_FOUND,
  PRODUCT_FOUND,
} = require("../../constants/responses");
const { getProduct } = require("../../database/productTable");

module.exports.handler = async (event) => {
  const {
    pathParameters: { id },
  } = event;

  const product = await getProduct(id);

  if (!product) {
    return createNotFoundResponse(PRODUCT_NOT_FOUND);
  }

  return createSuccessResponse(PRODUCT_FOUND, product, 200);
};
