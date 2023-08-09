const userService = require('../../services/userService');
const bcrypt = require('bcrypt');
const sessionService = require('../../services/sessionService');
const Session = require('../../models/Session');

const logoutUser = async (req, res) => {
    if (!req.cookies.s_id) {
		  return res.status(400).json({ error: 'Wrong request' });
    }

    const session = await Session.findOne({sessionId: req.cookies.s_id});

    if (!session) {
		  return res.status(400).json({ error: 'Wrong request' });
    }

    await Session.deleteOne({'_id': session.id});
    res.clearCookie('s_id');
    return res.status(200).json('logged out');  
}

loginUser = async (req, res) => {
	const body = req.body;
  try {
      const registeredUser = await userService.findRegisteredUserByEmail(body.email);

      if (!registeredUser) {
          return res.status(400).json({ error: 'User does not exist or invalid email.' });
      }

      if (!registeredUser.verified) {
          return res.status(400).json({ error: 'User not verified.' });
      }

      const password = body.password;
      const result = await bcrypt.compare(password, registeredUser.password);

      if (!result) {
          return res.status(400).json({ error: 'Invalid password.' });
      }

      const session = await sessionService.createSession(registeredUser);

      res.cookie('s_id', session.sessionId, {
          secure: true,
          httpOnly: true,
      });
      return res.status(200).json(registeredUser);
  } catch (error){
		  return res.status(500).json({ error: error.message });
  }
};

module.exports = {
	loginUser,
  logoutUser
}