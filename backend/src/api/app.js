const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const logger = require("morgan");

const errorHandler = require("./errorHandler");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", routes);

app.use(errorHandler);

module.exports = app;
