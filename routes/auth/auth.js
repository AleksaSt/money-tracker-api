const express = require('express');
const router = express.Router();

const registerController = require('../../controllers/auth/RegisterController')

router.post('/', registerController.registerUser);
router.post('/login', );

module.exports = router;