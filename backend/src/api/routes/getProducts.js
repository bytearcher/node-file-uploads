const asyncHandler = require("express-async-handler");

const { getProducts } = require("../../service/getProducts");

async function getProductsHandler(req, res, next) {
  res.send(await getProducts());
}

const getProductsRoute = [asyncHandler(getProductsHandler)];

module.exports = {
  getProductsRoute,
};
