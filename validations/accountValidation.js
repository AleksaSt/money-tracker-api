const Joi = require('joi');

const accountSchema = Joi.object().keys({
  balance: Joi.number().max(1000000000000).required(),
})

const validateAccount = body => {
  return accountSchema.validate(body);
}

module.exports = {
	validateAccount
}