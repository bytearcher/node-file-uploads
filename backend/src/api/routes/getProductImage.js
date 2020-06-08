const dummyResponses = require("./dummyResponses");

function getProductImageHandler(req, res, next) {
  res.set({
    "Content-Type": dummyResponses.getProductImage.contentType,
    "Content-Length": dummyResponses.getProductImage.contentLength,
  });
  res.send(dummyResponses.getProductImage.data);
}

const getProductImageRoute = [getProductImageHandler];

module.exports = {
  getProductImageRoute,
};
