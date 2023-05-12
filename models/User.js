const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
	email: {
		type: String,
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	password: {
		type: String,
	},
	username: {
		type: String,
	},
})

module.exports = mongoose.model('users', UsersSchema);