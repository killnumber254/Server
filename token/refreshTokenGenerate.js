const jwt = require("jsonwebtoken");
const refreshTokenGenerate = (id) => {
	return jwt.sign({ id }, process.env.JWT_KEY, {
		expiresIn: process.env.REFRESH_TOKEN,
	});
};

module.exports = refreshTokenGenerate;
