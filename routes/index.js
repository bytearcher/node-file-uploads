const Busboy = require("busboy");
const express = require("express");

const router = new express.Router();
const dummyResponses = require("./dummyResponses");

router.post("/products", (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers });

  busboy.on("field", (name, value) => {
    console.log(`${name}: ${value}`);
  });
  busboy.on("file", (name, stream, filename, encoding, contentType) => {
    console.log(`${name}: ${filename} (${contentType})`);
    stream.resume();
  });
  busboy.on("finish", () => {
    res.send(dummyResponses.createNewProduct);
  });

  req.pipe(busboy);
});

router.get("/products", (req, res, next) => {
  res.send(dummyResponses.getProducts);
});

router.get("/products/:productId", (req, res, next) => {
  res.send(dummyResponses.getProduct);
});

router.get("/products/:productId/images/:imageId", (req, res, next) => {
  res.set({
    "Content-Type": dummyResponses.getProductImage.contentType,
    "Content-Length": dummyResponses.getProductImage.contentLength,
  });
  res.send(dummyResponses.getProductImage.data);
});

module.exports = router;
