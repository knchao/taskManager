// Setting up our database connection
const Sequelize = require('sequelize');
const config = new Sequelize("task_manager", "root", "password", {dialect:'mysql'});

module.exports = config;