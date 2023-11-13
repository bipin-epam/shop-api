const joi = require("joi");

module.exports.createSchema = joi.object({
  title: joi.string().min(1).max(300).required(),
  description: joi.string().min(1).max(500).required(),
  price: joi.number().required().min(0),
});
