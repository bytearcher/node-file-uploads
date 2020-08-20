const asyncHandler = require("express-async-handler");
const Joi = require("@hapi/joi");

const { getProduct } = require("../../service/getProduct");
const { validator } = require("../validation");

const paramsSchema = Joi.object({
  productId: Joi.number().required(),
});

async function getProductHandler(req, res, next) {
  const { productId } = req.params;

  const product = await getProduct(productId);
  if (!product) {
    return res.sendStatus(404);
  }

  res.setTimeout(60 * 1000);

  res.send(product);
}

const getProductRoute = [validator.params(paramsSchema), asyncHandler(getProductHandler)];

module.exports = {
  getProductRoute,
};
