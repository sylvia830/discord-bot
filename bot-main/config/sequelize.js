const Sequelize = require("sequelize");

const sequelize = new Sequelize({
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

module.exports = sequelize;
