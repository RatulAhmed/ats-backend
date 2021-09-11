const Sequelize = require('sequelize');
const db = require('../config/database');



const Nfl_config = db.define('nfl_config', {
    currentWeek : {
        type: Sequelize.DataTypes.STRING,
    }
})

module.exports = Nfl_config;