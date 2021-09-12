const Sequelize = require('sequelize');
module.exports = 
new Sequelize('postgresql://doadmin:Dn_0wyy-NmloRCsG@db-postgresql-nyc1-58709-do-user-9815001-0.b.db.ondigitalocean.com:25060/ats_app?sslmode=require',
{
    define:{ timestamps: false },
    dialectOptions: {
        ssl : {
            rejectUnauthorized: false
        }
    }
});

