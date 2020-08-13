const dummyResponses = require("./dummyResponses");

async function getProducts() {
  return dummyResponses.getProducts;
}

module.exports = {
  getProducts,
};
