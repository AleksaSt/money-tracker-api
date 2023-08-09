const User = require("../models/User");
const bcrypt = require('bcrypt');

//Creating user, hashing password, saving to database
const createUser = async body => {
  const email = body.email;
  const firstName = body.firstName;
  const lastName = body.lastName;
  const password = body.password;
  const username = body.username;

  const encryptedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: encryptedPassword,
    username: username,
  });
  
  return user.save(); 
};

//Checking if user already exists with email
const findRegisteredUserByEmail = async email => {
  return await User.findOne({ email: email });
}

//Verifying user
const setUserVerified = async (id, isVerified) => {
  const user = await User.findById(id);
  user.verified = isVerified;
  return await user.save();
}

//Finding user by id
const findUserById= async id => {
  return await User.findById({ _id: id });
}

module.exports = {
	createUser,
  findRegisteredUserByEmail,
  setUserVerified,
  findUserById
}