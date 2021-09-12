const express = require('express');
const router = express.Router();

const Odd = require('../models/odd');
const Nfl_config = require('../models/nfl_config');

const User_Choice = require('../models/user_choice');

router.get('/', async (req, res, next) => {
    try {
        nfl_config = await Nfl_config.findAll({
            attributes: ['currentWeek'],

        })
    } catch(err) {
        console.log(err);
    }
     const currentWeek  = nfl_config[0].currentWeek;
    // retrieves all the odds for the currentWeek given by the config
    try {
    const weeklyOdds = await Odd.findAll({
        where: {
            week: currentWeek
        },
        order: [
            ['id', 'ASC']
        ]
    });
    return res.json(weeklyOdds);
 } catch(err) {
    return res.status(404).json({
        message: 'Error'
    })
}
});

router.get('/:user_id', async(req, res, next) => { 
    try {
        const choices = await User_Choice.findAll({
            where: {
                user_id: req.params.user_id
            }
        });
        return res.json(choices);
    } catch(err) {
    }
    return res.json('Succesfully returned your choices');

});

module.exports = router;