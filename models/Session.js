const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require("../models/User");

const SessionSchema = new Schema({
	sessionId: {
		type: String,
	},
  user: UserSchema.schema
})

module.exports = mongoose.model('sessions', SessionSchema);
