const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJwtToken = (payload, expiry) => {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: expiry } ) 
}

module.exports = {
	generateJwtToken
}