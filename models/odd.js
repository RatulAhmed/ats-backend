const Sequelize = require('sequelize');
const db = require('../config/database');

const Odd = db.define('odd', {

    week: {
        type: Sequelize.DataTypes.STRING,

    },
    away_team: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    away_spread: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    home_team: {
        type: Sequelize.DataTypes.STRING,
        allowNull:false
    },
    home_spread: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    winner : {
        type: Sequelize.DataTypes.away_team || Sequelize.DataTypes.home_team || 'push'
    },
    isLocked: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
    }
});


module.exports = Odd;