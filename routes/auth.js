const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', async(req, res, next) => {
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

router.post('/login', async(req, res, next) => {
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
            userId: user.id,
            token: token,
            expiresIn: 3600,
            username: user.username
        });
    }
    else {
        return res.status(404).json({
            message: "Incorrect password/email combination"
        })
    }
});

router.get('/test',
checkAuth,
(req, res, next) =>{
    res.status(200).json({message: 'We verified the token is correct'});
})

module.exports = router;