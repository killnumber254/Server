const jwt = require("jsonwebtoken");
const generateToken = (id) => {
	console.log(id);
	return jwt.sign({ id }, process.env.JWT_KEY, {
		expiresIn: "24h",
	});
};

module.exports = generateToken;
