const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../db/sequelize");

class Token extends Sequelize.Model {}

Token.init(
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		token: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "Tokens",
		tableName: "Tokens",
	}
);

// (async () => {
// 	await sequelize.sync({ force: true });
// })();

module.exports = Token;
