const sequelize = require("./sequelize");

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (e) {
  console.error("Unable to connect to the database:", error);
}

sequelize.sync();
