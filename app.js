const express = require('express');

const app = express();
const User = require('./models/user');
const db = require('./config/database');
const bcrypt = require('bcrypt');


db
  .authenticate()
  .then(() => {
      console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    'Unable to connect to the database:', err
  });  

/**Middleware */
app.use(express.json())



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
})


/* Routes  */
app.post('/api/auth/signup', async(req, res, next) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const {email, username, password } = req.body;
    try {
        const user = await User.create({email, username, password})
        return res.json(user);
    } catch(err){
        console.log(err);
        return res.status(500);
    }
})

module.exports = app;