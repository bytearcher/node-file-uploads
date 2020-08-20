const asyncHandler = require("express-async-handler");
const Joi = require("@hapi/joi");
const stream = require("stream");
const util = require("util");

const { getProductImage } = require("../../service/getProductImage");
const { validator } = require("../validation");

const pipeline = util.promisify(stream.pipeline);

const paramsSchema = Joi.object({
  productId: Joi.number().required(),
  imageId: Joi.number().required(),
});

async function getProductImageHandler(req, res, next) {
  const { productId, imageId } = req.params;

  const image = await getProductImage(productId, imageId);
  if (!image) {
    return res.sendStatus(404);
  }

  // note! set timeout at this point, once we have database connection already, otherwise we might be killed while waiting db, and there's no one to end it once it's acquired
  res.setTimeout(60 * 1000);

  res.set({
    "Content-Type": image.contentType,
    "Content-Length": image.contentLength,
  });

  await pipeline(image.stream, res);
}

const getProductImageRoute = [validator.params(paramsSchema), asyncHandler(getProductImageHandler)];

module.exports = {
  getProductImageRoute,
};
