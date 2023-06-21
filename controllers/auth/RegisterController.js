const userService = require('../../services/userService');
const { isValidJSON } = require("../../validations/utils/jsonValidation");
const { validateUser } = require("../../validations/userValidation");

//User Registration w/ validation, checking if user already exists and email verification
exports.registerUser = async (req, res) => {
	if (!isValidJSON(req.body)) {
		console.error('invalid json');
		return res.status(400).json({ error: 'invalid json' });
	}

	const validation = validateUser(req.body);
	if(validation.error){
		console.error(validation.error)
		return res.status(400).json(validation.error.details[0].message);
	}

	const body = req.body;

	try {

		const existingUser = await userService.findRegisteredUserByEmail(body);
		if (existingUser) {
			return res.redirect('/');
		}

		const user = await userService.createUser(body);
		if (!user) {
			return res.status(400).json({ error: 'User not created.' });
		}

    const token = await userService.createToken(user._id);
    console.log(token)
    const maxAge = 3 * 24 * 60 * 60 * 1000
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
    // res.status(201).json({ user: user._id });
  
		const verificationResult = await userService.emailVerification(body);
		console.log(verificationResult)
		if(verificationResult){
			console.log('Email sent successfully')
			return res.redirect('/verify');
		}
		// return res.status(200).json(user);
		
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};