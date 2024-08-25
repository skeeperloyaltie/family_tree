const { Sequelize } = require('sequelize');

// Initialize Sequelize with SQLite3
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // This is the SQLite file that will be created in your project root
});

module.exports = sequelize;