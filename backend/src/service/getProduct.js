const { withinTransaction } = require("./databaseCalls");

async function getProduct(productId) {
  return withinTransaction(async (productDatabase) => {
    const product = await productDatabase.findProduct(productId);
    return product;
  });
}

module.exports = {
  getProduct,
};
