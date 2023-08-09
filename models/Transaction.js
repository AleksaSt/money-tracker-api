const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = require("../models/Category");

const TransactionSchema = new Schema({
  // initialBallance: {
  //     type: Number
  // },
  amount: {
		type: Number
	},

  // timestamps: {
  //   createdAt: 'created_at'
  // },
  categories: [CategorySchema.schema]
}, { timestamps: true })

module.exports = mongoose.model('transactions', TransactionSchema);