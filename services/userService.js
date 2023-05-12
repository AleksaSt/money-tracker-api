const User = require("../models/User");

const createUser = body => {
  const user = new User(body);
  user.save().then(response => {
   return res.status(200).json(response);
  }).catch(error => {
   return res.status(500).json({ error: error.message });
  })
};

module.exports = {
	createUser
}