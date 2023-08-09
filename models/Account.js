const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TransactionSchema = require("../models/Transaction");

const AccountSchema = new Schema({
  balance: {
    type: Number
  },
  transactions: [TransactionSchema.schema]
})

module.exports = mongoose.model('accounts', AccountSchema);