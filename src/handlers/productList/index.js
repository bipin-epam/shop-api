"use strict";
const products = require("../../../data/products");
const createSuccessResponse = require("../../common/createSuccessResponse");
const { PRODUCTS_FETCHED } = require("../../constants/responses");

const handler = async (event) => {
  return createSuccessResponse(PRODUCTS_FETCHED, products, 200);
};

module.exports = { handler };
