const expressJoiValidation = require("express-joi-validation");
const Joi = require("@hapi/joi");

const validator = expressJoiValidation.createValidator({
  passError: true,
});

function presentValidationError(err) {
  return err.error;
}

function isValidationError(err) {
  return err.error instanceof Joi.ValidationError;
}

module.exports = {
  validator,
  presentValidationError,
  isValidationError,
};
