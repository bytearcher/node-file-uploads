const { connect } = require("../integration/productDatabase");
const { executeCommandRollbackOnError } = require("./databaseCalls");

async function getProductImage(productId, imageId) {
  return executeCommandRollbackOnError(await connect(), async (productDatabase) => {
    const image = await productDatabase.findProductImage(productId, imageId);

    if (!image) {
      productDatabase.rollbackAndRelease();
      return;
    }

    const { contentType, contentLength, stream } = image;

    stream.on("end", () => {
      productDatabase.commitAndRelease();
    });

    return {
      contentType,
      contentLength,
      stream,
    };
  });
}

module.exports = {
  getProductImage,
};
