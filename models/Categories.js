const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
	name: {
		type: String,
	},
	userId: {
		type: Number
	},
	accountId: {
		type: Number
	}
})

module.exports = mongoose.model('categories', CategoriesSchema);