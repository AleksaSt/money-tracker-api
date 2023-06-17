const userService = require('../../services/userService');
const bcrypt = require('bcrypt');

exports.loginUser = async (req, res) => {
	const body = req.body;
  console.log(body);
  try {
    const registeredUser = await userService.findRegisteredUserByEmail(body);
      if (!registeredUser) {
			return res.status(400).json({ error: 'User does not exist or invalid email.' });
		}
    const password = body.password;
    const result = await bcrypt.compare(password, registeredUser.password);
    if (result) {
			return res.status(200).json(registeredUser);
		} else {
      return res.status(400).json({ error: 'Invalid password.' });
    }
  } catch (error){
		return res.status(500).json({ error: error.message });
  }
};