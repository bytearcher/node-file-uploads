const { withinTransaction } = require("./databaseCalls");

async function getProducts() {
  return withinTransaction(async (productDatabase) => {
    const products = await productDatabase.getProducts();
    return products;
  });
}

module.exports = {
  getProducts,
};
