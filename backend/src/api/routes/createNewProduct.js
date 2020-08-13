const asyncHandler = require("express-async-handler");
const Busboy = require("busboy");

const { NewProductCreator } = require("../../service/createNewProduct");

async function createNewProductHandler(req, res, next) {
  const busboy = new Busboy({ headers: req.headers });
  const newProductCreator = new NewProductCreator();

  async function handleError(fn) {
    try {
      await fn();
    } catch (e) {
      next(e);
    }
  }

  busboy.on("field", async (name, value) => {
    handleError(async () => {
      await newProductCreator.addField(name, value);
    });
  });
  busboy.on("file", async (name, stream, filename, encoding, contentType) => {
    handleError(async () => {
      await newProductCreator.addFile(name, stream, filename, contentType);
    });
  });
  busboy.on("finish", async () => {
    handleError(async () => {
      res.send(await newProductCreator.finish());
    });
  });

  req.pipe(busboy);
}

const createNewProductRoute = [asyncHandler(createNewProductHandler)];

module.exports = {
  createNewProductRoute,
};
