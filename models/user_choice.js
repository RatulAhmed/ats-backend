const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('../models/user');
const Odd = require('./odd');


const User_Choice = db.define('user_choice', {

    odd_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
            model: Odd,
            key: 'id'
        },

    },
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    selection: {
        type: Sequelize.DataTypes.STRING
    }
});

User_Choice.belongsTo(Odd, {
    foreignKey: 'odd_id',
    sourceKey: 'odd_id'
})


module.exports= User_Choice;