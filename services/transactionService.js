const Transaction = require("../models/Transaction");

const createTransaction = amount => {
  
  const transaction = new Transaction({
    amount: amount
  });

  return transaction.save();
}

module.exports = {
	createTransaction
}