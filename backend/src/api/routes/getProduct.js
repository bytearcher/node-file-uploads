const dummyResponses = require("./dummyResponses");

function getProductHandler(req, res, next) {
  res.send(dummyResponses.getProduct);
}

const getProductRoute = [getProductHandler];

module.exports = {
  getProductRoute,
};
