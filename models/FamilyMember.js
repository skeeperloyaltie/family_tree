const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FamilyMember = sequelize.define('FamilyMember', {
    fullName: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.DATE },
    gender: { type: DataTypes.STRING },
    nationalId: { type: DataTypes.STRING, unique: true },
    parents: { type: DataTypes.ARRAY(DataTypes.UUID) }, // UUID array for parent references
    siblings: { type: DataTypes.ARRAY(DataTypes.UUID) }, // UUID array for sibling references
    spouse: { type: DataTypes.UUID }, // UUID reference for spouse
    children: { type: DataTypes.ARRAY(DataTypes.UUID) } // UUID array for child references
});

module.exports = FamilyMember;