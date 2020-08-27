const { connect } = require("../integration/productDatabase");

async function getProductImage(productId, imageId) {
  const productDatabase = await connect();
  const image = await productDatabase.findProductImage(productId, imageId);

  if (!image) {
    productDatabase.release();
    return;
  }

  const { contentType, contentLength, stream } = image;

  stream.on("end", () => {
    productDatabase.release();
  });

  return {
    contentType,
    contentLength,
    stream,
  };
}

module.exports = {
  getProductImage,
};
