const jwt = require('jsonwebtoken');
require('dotenv').config();
const userService = require('../../services/userService');

exports.verifyUserMail = async (req, res) => {
	const token = req.query.token;

  try {
    const payload = jwt.verify(token, process.env.SECRET);

    const result = await userService.setUserVerified(payload.id, true);
    return res.json(result);
  } catch (error) {
		return res.status(500).json({ error: error.message });
  }
};