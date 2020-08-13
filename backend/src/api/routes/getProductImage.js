const asyncHandler = require("express-async-handler");

const { getProductImage } = require("../../service/getProductImage");

async function getProductImageHandler(req, res, next) {
  const image = await getProductImage();

  res.set({
    "Content-Type": image.contentType,
    "Content-Length": image.contentLength,
  });

  res.send(image.data);
}

const getProductImageRoute = [asyncHandler(getProductImageHandler)];

module.exports = {
  getProductImageRoute,
};
