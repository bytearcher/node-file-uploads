const { connect } = require("../integration/productDatabase");

async function getProducts() {
  const productDatabase = await connect();
  const products = await productDatabase.getProducts();
  await productDatabase.release();

  return products;
}

module.exports = {
  getProducts,
};
