const { connect } = require("../integration/productDatabase");

class NewProductCreator {
  constructor() {
    this.product = {};
    this.imageIds = [];
    this.productDatabasePromise = connect();
  }

  async addField(name, value) {
    this.product[name] = value;
  }

  async addFile(name, stream, filename, contentType) {
    const productDatabase = await this.productDatabasePromise;
    if (name === "images") {
      const imageId = await productDatabase.insertProductImage(stream, contentType);
      this.imageIds.push(imageId);
    }
  }

  async finish() {
    const productDatabase = await this.productDatabasePromise;
    const productId = await productDatabase.insertProduct(this.product);
    await productDatabase.updateProductIdForImages(productId, this.imageIds);

    await productDatabase.release();

    return {
      id: productId,
    };
  }
}

module.exports = {
  NewProductCreator,
};
