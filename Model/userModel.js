const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Role = require("./roleModel");
class User extends Sequelize.Model {}

User.init(
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isUnique: (value, next) => {
					User.findAll({
						where: { username: value },
						attributes: ["id"],
						notEmpty: true,
					})
						.then((user) => {
							if (user.length != 0)
								next(new Error(" Username already in use!"));
							next();
						})
						.catch((onError) => console.log(onError, "Ошибка"));
				},
			},
		},
		pass: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ sequelize, tableName: "Users" }
);

// User.hasMany(Role, {
// 	as: "Roles",
// 	foreignKey: "userId",
// });

// Role.belongsTo(User, {
// 	foreignKey: "userId",
// });

// User.hasMany(Token, {
//   as: "Tokens",
//   foreignKey: "userId",
// });
// Token.belongsTo(User, {
//   foreignKey: "userId",
// });

// (async () => {
// 	await sequelize.sync({ force: true });
// })();

module.exports = User;
