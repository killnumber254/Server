const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

class Role extends Sequelize.Model {}

Role.init(
	{
		userId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		roleName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "Roles",
	}
);

// (async () => {
// 	await sequelize.sync({ force: true });
// })();

module.exports = Role;
