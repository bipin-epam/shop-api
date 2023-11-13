"use strict";

const createError = require("../../common/createError");
const createSuccessResponse = require("../../common/createSuccessResponse");
const {
  PRODUCTS_FETCHED,
  SOMETHING_WRONG,
} = require("../../constants/responses");
const { getAllProducts } = require("../../database/productTable");
const { getAllStocks } = require("../../database/stockTable");

module.exports.handler = async (event) => {
  try {
    const products = await getAllProducts();
    const stocks = await getAllStocks();

    const data = products.map((product) => {
      return {
        ...product,
        count: stocks.find((stock) => stock.product_id === product.id)?.count,
      };
    });

    return createSuccessResponse(PRODUCTS_FETCHED, data, 200);
  } catch (e) {
    return createError(SOMETHING_WRONG);
  }
};
