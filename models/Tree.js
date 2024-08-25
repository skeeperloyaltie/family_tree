const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tree = sequelize.define('Tree', {
    name: { type: DataTypes.STRING, allowNull: false }, // e.g., "Gudah Family Tree"
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Tree;