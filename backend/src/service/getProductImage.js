const dummyResponses = require("./dummyResponses");

async function getProductImage() {
  return dummyResponses.getProductImage;
}

module.exports = {
  getProductImage,
};
