const jwt = require("jsonwebtoken");

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_KEY, {
		expiresIn: process.env.TOKEN_LIFE,
	});
};

module.exports = generateToken;
