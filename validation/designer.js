const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateDesignerInput(data) {
  let errors = {};

  data.timeDevoted = !isEmpty(data.timeDevoted) ? data.timeDevoted : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.education = !isEmpty(data.education) ? data.education : "";


  if (Validator.isEmpty(data.timeDevoted)) {
    errors.name = "time devoted field is required";
  }

  if (Validator.isEmpty(data.type)) {
    errors.name = "type field is required";
  }

  if (Validator.isEmpty(data.education)) {
    errors.name = "education field is required";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};