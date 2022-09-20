const User = require("../Model/userModel");

async function deleteUser() {
	await User.destroy({ force: true });
}

module.exports = deleteUser;
