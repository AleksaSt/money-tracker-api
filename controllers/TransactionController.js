const transactionService = require('../services/transactionService');
// const userService = require('../services/userService');
// const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const User = require('../models/User');


// const { validateAccount } = require('../validations/accountValidation');

const createTransaction = async (req, res) => {

	// const validation = validateAccount(req.body);

	// if (validation.error) {
	// 	return res.status(400).json(validation.error.details[0].message);
	// }

  const id = req.params.id;
  const body = req.body;

  try {
    const transaction = await transactionService.createTransaction(body.amount, id);

    if(!transaction){
      return res.status(400).json({ error: 'Transaction not created.' });
    } 

    const account = await Account.findById(id);
    account.transactions.push(transaction);
    // account.save();
    const user =  await User.findById('64cbd459fa3a2697bdd6a6ff')
    // user.accounts.push(account)
    // const user =  await userService.findUserById('64cb8207e525ddd440ba1cc1')
    
    
    // user.accounts.push(account)
    user.save();
    console.log(user);
    

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}

module.exports = {
  createTransaction
}