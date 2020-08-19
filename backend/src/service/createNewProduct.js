const Joi = require("@hapi/joi");

const { connect } = require("../integration/productDatabase");
const { executeCommandRollbackOnError } = require("./databaseCalls");

const schema = Joi.object({
  title: Joi.string().required().trim(),
  manufacturer: Joi.string().required().trim(),
  price: Joi.number().required(),
  description: Joi.string().required().trim(),
});

function validateAndSanitizeProduct(rawFields) {
  const validationResult = schema.validate(rawFields);
  if (validationResult.error) {
    throw validationResult;
  }
  return validationResult.value;
}

class NewProductCreator {
  constructor() {
    this.rawFields = {};
    this.imageIds = [];
    this.productDatabasePromise = connect();
  }

  async addField(name, value) {
    this.rawFields[name] = value;
  }

  async addFile(name, stream, filename, contentType) {
    await executeCommandRollbackOnError(await this.productDatabasePromise, async (productDatabase) => {
      if (name === "images") {
        const imageId = await productDatabase.insertProductImage(stream, contentType);
        this.imageIds.push(imageId);
      }
    });
  }

  async finish() {
    return executeCommandRollbackOnError(await this.productDatabasePromise, async (productDatabase) => {
      const product = validateAndSanitizeProduct(this.rawFields);
      const productId = await productDatabase.insertProduct(product);
      await productDatabase.updateProductIdForImages(productId, this.imageIds);

      await productDatabase.commitAndRelease();

      return {
        id: productId,
      };
    });
  }
}

module.exports = {
  NewProductCreator,
};
