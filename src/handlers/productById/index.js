"use strict";

const products = require("../../../data/products");
const createNotFoundResponse = require("../../common/createNotFoundResponse");
const createSuccessResponse = require("../../common/createSuccessResponse");
const {
  PRODUCT_NOT_FOUND,
  PRODUCT_FOUND,
} = require("../../constants/responses");

module.exports.handler = async (event) => {
  const {
    pathParameters: { id },
  } = event;

  const product = products.find((x) => x.id === id);

  if (!product) {
    return createNotFoundResponse(PRODUCT_NOT_FOUND);
  }

  return createSuccessResponse(PRODUCT_FOUND, product, 200);
};
