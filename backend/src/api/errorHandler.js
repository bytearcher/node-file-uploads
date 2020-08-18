const { isValidationError, presentValidationError } = require("./validation");

function errorHandler(err, req, res, next) {
  if (isValidationError(err)) {
    return res.status(422).send({ error: presentValidationError(err) });
  }
  return next(err);
}

module.exports = errorHandler;
