const Token = require("../Model/tokenModel");

async function deleteToken(req, res) {
	await Token.destroy({ where: { userId: 1 } });
	res
		.status(200)
		.clearCookie("access_token", "refresh_token")
		.send("Complete Delete");
}

module.exports = deleteToken;
