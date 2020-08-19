const asyncHandler = require("express-async-handler");
const Busboy = require("busboy");
const Joi = require("@hapi/joi");
const { default: PQueue } = require("p-queue");

const { NewProductCreator } = require("../../service/createNewProduct");
const { validator } = require("../validation");

const headersSchema = Joi.object({
  "content-type": Joi.string()
    .required()
    .pattern(/^multipart\/form-data/),
});

async function createNewProductHandler(req, res, next) {
  const busboy = new Busboy({ headers: req.headers });
  const sequentialWorkQueue = new PQueue({ concurrency: 1 });
  const newProductCreator = new NewProductCreator();

  async function executeSequentiallyAbortOnError(fn) {
    sequentialWorkQueue.add(async () => {
      try {
        await fn();
      } catch (e) {
        req.unpipe(busboy);
        sequentialWorkQueue.pause();
        next(e);
      }
    });
  }

  busboy.on("field", async (name, value) => {
    executeSequentiallyAbortOnError(async () => {
      await newProductCreator.addField(name, value);
    });
  });
  busboy.on("file", async (name, stream, filename, encoding, contentType) => {
    executeSequentiallyAbortOnError(async () => {
      await newProductCreator.addFile(name, stream, filename, contentType);
    });
  });
  busboy.on("finish", async () => {
    executeSequentiallyAbortOnError(async () => {
      res.send(await newProductCreator.finish());
    });
  });

  req.pipe(busboy);
}

const createNewProductRoute = [validator.headers(headersSchema), asyncHandler(createNewProductHandler)];

module.exports = {
  createNewProductRoute,
};
