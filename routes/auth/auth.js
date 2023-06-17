const express = require('express');
const router = express.Router();

const registerController = require('../../controllers/auth/RegisterController');
const loginController = require('../../controllers/auth/LoginController');

router.post('/', registerController.registerUser);
router.post('/login', loginController.loginUser);

module.exports = router;