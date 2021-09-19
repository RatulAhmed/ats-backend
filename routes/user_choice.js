const express = require('express');
const router = express.Router();
const Odd = require('../models/odd');
const Nfl_config = require('../models/nfl_config');

const User_Choice = require('../models/user_choice');

router.post('', async(req, res, next) => {
    try {

        for(let i = 0; i < req.body.length; i++) {
            const [choice, created] = await User_Choice.findOrCreate({
                where : {
                  odd_id :req.body[i].odd_id,
                  user_id: req.body[i].user_id
                }
            })
            console.log('The object from query', choice)
            choice.selection = req.body[i].selection;
            choice.save();
        }   
        return res.json({
            message: 'Your Selections Have Been Saved'})
    } catch(error) {
        return res.json({
            error: error,
            message: 'There was an error saving your pick'
        });
    }
})


module.exports = router;