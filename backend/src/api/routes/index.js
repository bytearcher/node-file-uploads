const express = require("express");

const { createNewProductRoute } = require("./createNewProduct");
const { getProductImageRoute } = require("./getProductImage");
const { getProductRoute } = require("./getProduct");
const { getProductsRoute } = require("./getProducts");

const router = new express.Router();

router.get("/products", getProductsRoute);
router.get("/products/:productId", getProductRoute);
router.get("/products/:productId/images/:imageId", getProductImageRoute);
router.post("/products", createNewProductRoute);

module.exports = router;
