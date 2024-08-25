const sequelize = require('../config/database');

const User = require('./User');
const Tree = require('./Tree');
const FamilyMember = require('./FamilyMember');

// Define associations
Tree.hasMany(FamilyMember, { as: 'members', foreignKey: 'treeId' });
FamilyMember.belongsTo(Tree, { foreignKey: 'treeId' });

// Export all models
module.exports = {
    sequelize,
    User,
    Tree,
    FamilyMember
};