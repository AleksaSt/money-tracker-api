const Account = require("../models/Account");

const createAccount = balance => {
  
  const account = new Account({
    balance: balance
  });

  return account.save();
}

module.exports = {
	createAccount
}