const dummyResponses = require("./dummyResponses");

function getProductsHandler(req, res, next) {
  res.send(dummyResponses.getProducts);
}

const getProductsRoute = [getProductsHandler];

module.exports = {
  getProductsRoute,
};
