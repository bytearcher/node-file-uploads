const Busboy = require("busboy");
const express = require("express");

const router = new express.Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/", (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers });

  busboy.on("field", (name, value) => {
    console.log(`${name}: ${value}`);
  });
  busboy.on("file", (name, stream, filename, encoding, contentType) => {
    console.log(`${name}: ${filename} (${contentType})`);
    stream.resume();
  });
  busboy.on("finish", () => {
    res.send("OK");
  });

  req.pipe(busboy);
});

module.exports = router;
