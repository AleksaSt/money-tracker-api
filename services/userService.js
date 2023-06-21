const User = require("../models/User");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//Registration

//Creating user, hashing password, saving to database
const createUser = async body => {
  const email = body.email;
  const firstName = body.firstName;
  const lastName = body.lastName;
  const password = body.password;
  const username = body.username;

  const encryptedpassword = await bcrypt.hash(password, 12);

  const user = new User({
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: encryptedpassword,
    username: username,
  });
  
  return user.save(); 
};

//Checking if user already exists with email
const findRegisteredUserByEmail = async body => {
  const email = body.email;
  const existingUser = await User.findOne({ email: email });
  return existingUser
}

//Verifying via email
const emailVerification = async body => {
  const email = body.email;
  const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
      api_key: process.env.API_KEY
    }
  }));
  
  const result = await 
  transporter.sendMail({
    // to: email,
    to: 'alexastojcevic@yahoo.com',
    from: 'programmingandtestingcode@gmail.com',
    subject: 'verification-email',
    html: '<h1>Verify your email address to complete the signup and login into your account!</h1> <a href="http://localhost:3000/rredirect/success">Click here</a>'
  });
  return result;
}

const createToken = async (id) => {
  const maxAge =  3 * 24 * 60 * 60;
  return jwt.sign({ id }, 'nodejs secret', { expiresIn: maxAge } )
}

module.exports = {
	createUser,
  findRegisteredUserByEmail,
  emailVerification,
  createToken
}