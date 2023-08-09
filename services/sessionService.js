const Session = require("../models/Session");
const tokenService = require('./jwtTokenService');

const createSession = (user) => {

  const maxAge =  60 * 60 * 1000;
  const token = tokenService.generateJwtToken({userId: user.id}, maxAge);

  const session = new Session({
    sessionId: token,
    user: user,
  });

  return session.save();
}

module.exports = {
	createSession
}