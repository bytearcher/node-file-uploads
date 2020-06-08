const asyncHandler = require("express-async-handler");

const dummyResponses = require("./dummyResponses");

async function getProductImageHandler(req, res, next) {
  res.set({
    "Content-Type": dummyResponses.getProductImage.contentType,
    "Content-Length": dummyResponses.getProductImage.contentLength,
  });
  res.send(dummyResponses.getProductImage.data);
}

const getProductImageRoute = [asyncHandler(getProductImageHandler)];

module.exports = {
  getProductImageRoute,
};
