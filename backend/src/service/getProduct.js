const dummyResponses = require("./dummyResponses");

async function getProduct() {
  return dummyResponses.getProduct;
}

module.exports = {
  getProduct,
};
