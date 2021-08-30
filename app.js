const express = require('express');

const app = express();
const User = require('./models/user');
const db = require('./config/database');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const checkAuth = require('./middleware/check-auth');

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
    console.log(req.headers.authorization)
    user = await User.findOne({
        where: {
            email: req.body.email
        }
    })    
    try {
        result = await bcrypt.compare(req.body.password, user.password);
    } catch(err){
        console.log(err);
    }

    if(result === true) {
        const token = jwt.sign(
            { email: user.email, userId: user.id}, 
            'our_json_secret', 
            { expiresIn: '1h'});

        
        return res.status(200).json({
            user: user,
            token: token
        });
    }
    else {
        return res.status(404).json({
            message: "Incorrect password/email combination"
        })
    }
});

app.get('/api/auth/test',
checkAuth,
(req, res, next) =>{
    res.status(200).json({message: 'We verified the token is correct'});
})

module.exports = app;