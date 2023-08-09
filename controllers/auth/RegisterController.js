const userService = require('../../services/userService');
const { isValidJSON } = require("../../validations/utils/jsonValidation");
const { validateUser } = require("../../validations/userValidation");
const mailVerificationService = require('../../services/mailVerificationService');

//User Registration w/ validation, checking if user already exists and email verification
exports.registerUser = async (req, res) => {

	if (!isValidJSON(req.body)) {
		return res.status(400).json({ error: 'invalid json' });
	}

	const validation = validateUser(req.body);

	if (validation.error) {
		return res.status(400).json(validation.error.details[0].message);
	}

	const body = req.body;

	try {
    
		const existingUser = await userService.findRegisteredUserByEmail(body.email);

		// if (existingUser) {
		// 	return res.json({redirect: 'login'});
		// }

		const user = await userService.createUser(body);

		if (!user) {
			return res.status(400).json({ error: 'User not created.' });
		}
  
		// const mailingResult = await mailVerificationService.sendEmailVerification(body.email, user.id);

		// if (!mailingResult.response.includes('2.0.0 Ok')) {
		// 	return res.status(400).json({ error: 'Verification error' });
		// }

		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};