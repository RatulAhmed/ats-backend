const Sequelize = require('sequelize');
const db = require('../config/database');
const bcrypt = require('bcrypt');

const User = db.define('user', {
    email : {
        type: Sequelize.DataTypes.STRING
    },
    username : {
        type: Sequelize.DataTypes.STRING
    },
    password : {
        type: Sequelize.DataTypes.STRING
    },
    role : {
        type:  Sequelize.DataTypes.STRING
    }
})

module.exports = User;