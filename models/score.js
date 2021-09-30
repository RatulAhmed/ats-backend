const Sequelize = require('sequelize');
const User = require('../models/user');
const db = require('../config/database');

const Score = db.define('score', {
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    score: {
        type: Sequelize.DataTypes.DECIMAL,
        allowNull : false,
        default: 0
    }
})

Score.belongsTo(User, {
    foreignKey: 'user_id',
    sourceKey: 'user_id'
})

module.exports = Score;