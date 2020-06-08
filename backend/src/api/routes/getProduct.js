const asyncHandler = require("express-async-handler");

const dummyResponses = require("./dummyResponses");

async function getProductHandler(req, res, next) {
  res.send(dummyResponses.getProduct);
}

const getProductRoute = [asyncHandler(getProductHandler)];

module.exports = {
  getProductRoute,
};
