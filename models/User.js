// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const UserSchema = new mongoose.Schema({
//     fullName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     age: { type: Number, required: true },
//     nationalId: { type: String, unique: true }, // Only used for 18 and above
//     familyTree: { type: mongoose.Schema.Types.ObjectId, ref: 'Tree' },
//     uniqueId: { type: mongoose.Schema.Types.ObjectId, unique: true }, // For users under 18
//     role: { type: String, default: 'user' } // 'user' or 'admin'
// });

// // Hashing password before saving
// UserSchema.pre('save', async function(next) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// module.exports = mongoose.model('User', UserSchema);



const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    fullName: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true }, // New username field
    age: { type: DataTypes.INTEGER, allowNull: false },
    nationalId: { type: DataTypes.STRING, unique: true }, // For users 18 and above
    uniqueId: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, unique: true }, // For users under 18
    familyTree: { type: DataTypes.STRING }, // Modify based on how you plan to store references
    role: { type: DataTypes.STRING, defaultValue: 'user' }, // 'user' or 'admin'
    siblings: { type: DataTypes.JSON, defaultValue: [] }, // Store siblings as JSON
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = User;