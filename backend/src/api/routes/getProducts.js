const asyncHandler = require("express-async-handler");

const dummyResponses = require("./dummyResponses");

async function getProductsHandler(req, res, next) {
  res.send(dummyResponses.getProducts);
}

const getProductsRoute = [asyncHandler(getProductsHandler)];

module.exports = {
  getProductsRoute,
};
