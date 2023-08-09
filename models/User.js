const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AccountSchema = require("../models/Account");

const UsersSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
  verified: {
		type: Boolean,
    default: false
  },
  accounts: [AccountSchema.schema]
})

module.exports = mongoose.model('users', UsersSchema);