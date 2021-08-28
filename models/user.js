const Sequelize = require('sequelize');
const db = require('../config/database');
const bcrypt = require('bcrypt');

const User = db.define('user', {
    email : {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    username : {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    password : {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    role : {
        type:  Sequelize.DataTypes.STRING
    }
})

module.exports = User;