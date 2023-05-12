const userService = require('../../services/userService');

exports.registerUser = (req, res) => {

	const body = req.body;
	// const validation = validateMovieCreation(body);
	// if (validation.error) {
	// 	console.error('error: ', validation.error.details[0].message);
	// 	return res.status(400).json({ error: validation.error.details[0].message });
	// }

	userService
	.createUser(body)
	// .then(response => {
	// 	return res.status(200).json(response);
	// })
	// .catch(error => {
	// 	console.error('error: ', error);
	// 	return res.status(500).json({ error: error.message });
	// });
};