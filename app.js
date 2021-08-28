const express = require('express');

const app = express();
const User = require('./models/user');
const db = require('./config/database');
const bcrypt = require('bcrypt');
const cors = require('cors');

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
app.use(cors());
app.options('*', cors());


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
});

app.post('/api/auth/login', async(req, res, next) => {
    return res.json('response')
});

module.exports = app;