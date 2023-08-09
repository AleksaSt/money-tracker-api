const express = require('express');
const router = express.Router();

const registerController = require('../../controllers/auth/RegisterController');
const loginController = require('../../controllers/auth/LoginController');
const verificationController = require('../../controllers/auth/VerificationController');

// const middlwareFunction = async (request,response,next) => {
//   const user = await User.findOne({ email: request.body.email });
//   if (!user.verified) {
//       return response.status(400).json({ error: 'User not verified.' });
//   }
//   next()
// }

router.post('/', registerController.registerUser);
router.post('/login', loginController.loginUser);
router.get('/verify', verificationController.verifyUserMail);
router.post('/logout', loginController.logoutUser);

module.exports = router;