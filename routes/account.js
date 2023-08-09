const express = require('express');
const router = express.Router();

const accountController = require('../controllers/AccountController');

router.post('/:id', accountController.createAccount);

module.exports = router;