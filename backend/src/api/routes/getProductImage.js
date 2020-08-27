const asyncHandler = require("express-async-handler");
const stream = require("stream");
const util = require("util");

const { getProductImage } = require("../../service/getProductImage");

const pipeline = util.promisify(stream.pipeline);

async function getProductImageHandler(req, res, next) {
  const { productId, imageId } = req.params;

  const image = await getProductImage(productId, imageId);
  if (!image) {
    return res.sendStatus(404);
  }

  res.set({
    "Content-Type": image.contentType,
    "Content-Length": image.contentLength,
  });

  await pipeline(image.stream, res);
}

const getProductImageRoute = [asyncHandler(getProductImageHandler)];

module.exports = {
  getProductImageRoute,
};
