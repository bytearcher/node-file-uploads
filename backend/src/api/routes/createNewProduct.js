const asyncHandler = require("express-async-handler");
const Busboy = require("busboy");

const dummyResponses = require("./dummyResponses");

async function createNewProductHandler(req, res, next) {
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
}

const createNewProductRoute = [asyncHandler(createNewProductHandler)];

module.exports = {
  createNewProductRoute,
};
