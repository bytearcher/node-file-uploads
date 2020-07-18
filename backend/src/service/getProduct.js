const { connect } = require("../integration/productDatabase");

async function getProduct(productId) {
  const productDatabase = await connect();
  const product = await productDatabase.findProduct(productId);
  await productDatabase.release();

  return product;
}

module.exports = {
  getProduct,
};
