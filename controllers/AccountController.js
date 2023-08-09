const accountService = require('../services/accountService');
const User = require('../models/User');
const { validateAccount } = require('../validations/accountValidation');

const createAccount = async (req, res) => {

	const validation = validateAccount(req.body);

	if (validation.error) {
		return res.status(400).json(validation.error.details[0].message);
	}

  const id = req.params.id;
  const body = req.body;

  try {
    const account = await accountService.createAccount(body.balance, id);

    if(!account){
      return res.status(400).json({ error: 'Account not created.' });
    } 

    const user = await User.findById(id);

    user.accounts.push(account);
    user.save();
    // console.log(user);

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}

module.exports = {
  createAccount
}