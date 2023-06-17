const User = require("../models/User");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

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
      api_key: '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'
    }
  }));
  
  const result = await 
  transporter.sendMail({
    to: email,
    from: 'programmingandtestingcode@gmail.com',
    subject: 'verification-email',
    html: '<h1>Verification successful!</h1>'
  });
  return result;
}

module.exports = {
	createUser,
  findRegisteredUserByEmail,
  emailVerification
}