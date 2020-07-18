const asyncHandler = require("express-async-handler");

const { getProduct } = require("../../service/getProduct");

async function getProductHandler(req, res, next) {
  const { productId } = req.params;

  const product = await getProduct(productId);
  if (!product) {
    return res.sendStatus(404);
  }

  res.send(product);
}

const getProductRoute = [asyncHandler(getProductHandler)];

module.exports = {
  getProductRoute,
};
