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
            choice.selection = req.body[i].selection;
            if(req.body[i].selection === null || req.body[i].selection === 'No Selection') {
                User_Choice.destroy({
                    where: {
                        odd_id :req.body[i].odd_id,
                        user_id: req.body[i].user_id
                    }
                })
            } else {
            choice.save();
            }
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

router.get('/:user_id', async(req, res, next) => { 
    try {
        const choices = await User_Choice.findAll({
            where: {
                user_id: req.params.user_id
            },
            include: [{
                model: Odd,
                where: {week: '4' },
                attributes: []
            }]
        });
        return res.json(choices);
    } catch(err) {
        return res.json(err);
    }
});




module.exports = router;