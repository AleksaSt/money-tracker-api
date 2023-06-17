const Joi = require('joi');

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
	lastName: Joi.string().required(),
  password: Joi.string().min(4) .max(30).required(),
  username: Joi.string().min(4).required(),
})

const validateUser = body => {
  return userSchema.validate(body);
}

module.exports = {
	validateUser
}