const createNewProduct = {
  id: 2,
};

const getProducts = [
  {
    id: 2,
    title: "Stapler",
    manufacturer: "Leitz",
    price: 19.06,
    description: "Stapler for up to 30 sheets.",
    representativeImageId: 4,
  },
];

const getProduct = {
  id: 2,
  title: "Stapler",
  manufacturer: "Leitz",
  price: 19.06,
  description: "Stapler for up to 30 sheets.",
  imageIds: [4, 5, 6, 7, 8, 9, 10],
};

const svgRectangle =
  '<svg version="1.1" baseProfile="full" width="300" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="cornflowerblue"/></svg>';

const getProductImage = {
  contentType: "image/svg+xml",
  contentLength: svgRectangle.length,
  data: svgRectangle,
};

module.exports = {
  createNewProduct,
  getProducts,
  getProduct,
  getProductImage,
};
