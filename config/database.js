const Sequelize = require('sequelize');
module.exports = new Sequelize('postgresql://ratulahmed:postgres@localhost/ats-app',
{
    define:{ timestamps: false }
});

