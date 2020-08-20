const asyncHandler = require("express-async-handler");

const { getProducts } = require("../../service/getProducts");

async function getProductsHandler(req, res, next) {
  const products = await getProducts();

  res.setTimeout(60 * 1000);

  res.send(products);
}

const getProductsRoute = [asyncHandler(getProductsHandler)];

module.exports = {
  getProductsRoute,
};
