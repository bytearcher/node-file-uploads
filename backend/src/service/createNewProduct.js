
class NewProductCreator {
  constructor() {
    this.product = {};
    this.imageIds = [];
  }

  async addField(name, value) {
    this.product[name] = value;
  }

  async addFile(name, stream, filename, contentType) {
    if (name === "images") {
      const imageId = await productDatabase.insertProductImage(stream, contentType);
      this.imageIds.push(imageId);
    }
  }

  async finish() {
    const productId = await productDatabase.insertProduct(this.product);
    await productDatabase.updateProductIdForImages(productId, this.imageIds);
  }
}

module.exports = {
  NewProductCreator,
};
