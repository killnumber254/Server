const bcrypt = require("bcrypt");
const User = require("../Model/userModel");
const generateRole = require("../middleware/roleMeddleware");

const userAdmine = {
	user: "admine",
	password: "usAdmineSerg",
	role: "admine",
};

async function settingRegist(req, res) {
	const username = userAdmine.user;
	const password = userAdmine.password;
	const roleUser = userAdmine.role;
	const salt = bcrypt.genSaltSync(10);
	const passToSave = bcrypt.hashSync(password, salt);

	const user = await User.create({ username: username, password: passToSave });
	console.log(user.id);
	res.status(200).json(user);
	const roleAdmine = generateRole(user.id, roleUser);
	res.status(200).json(user);
}

module.exports = settingRegist;
