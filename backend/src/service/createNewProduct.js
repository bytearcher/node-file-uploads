const dummyResponses = require("./dummyResponses");

class NewProductCreator {
  async addField(name, value) {
    console.log(`${name}: ${value}`);
  }

  async addFile(name, stream, filename, contentType) {
    console.log(`${name}: ${filename} (${contentType})`);
    stream.resume();
  }

  async finish() {
    return dummyResponses.createNewProduct;
  }
}

module.exports = {
  NewProductCreator,
};
