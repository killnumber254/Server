const Role = require("../Model/roleModel");

async function generateRole(id, role) {
	console.log(role);
	if (!id) {
		throw Error;
	} else {
		console.log(id);
		return await Role.create({ userId: id, roleName: role });
	}
}

module.exports = generateRole;
