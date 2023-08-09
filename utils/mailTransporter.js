const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.PASSWORD
  }
});

module.exports = {
	transporter
}