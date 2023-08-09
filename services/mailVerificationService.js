const transporterUtil = require('../utils/mailTransporter');
const tokenService = require('./jwtTokenService');
require('dotenv').config();

const sendEmailVerification = async (email,userId) => {
  const result = await transporterUtil.transporter.sendMail(
    {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'verification-email',
      html: getMailHtml(userId)
    }
  );
  return result;
}

const getMailHtml = userId => {
  const maxAge =  60 * 60;
  const token = tokenService.generateJwtToken({id: userId}, maxAge);
  return `<h1>Verify your email address to complete the signup and login into your account!</h1> <a href="http://localhost:4000/verify?token=${token}">Click here</a>`;
}

module.exports = {
	sendEmailVerification
}