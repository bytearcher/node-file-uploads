const asyncHandler = require("express-async-handler");

const { getProduct } = require("../../service/getProduct");

async function getProductHandler(req, res, next) {
  res.send(await getProduct());
}

const getProductRoute = [asyncHandler(getProductHandler)];

module.exports = {
  getProductRoute,
};
