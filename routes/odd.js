const express = require('express');
const router = express.Router();

const Odd = require('../models/odd');
const Nfl_config = require('../models/nfl_config');

// TODO this routes should pass in a userid as a path param
router.get('/', async (req, res, next) => {
    try {
        nfl_config = await Nfl_config.findAll({
            attributes: ['currentWeek'],

        })
    } catch(err) {
        console.log(err);
    }
     const currentWeek  = nfl_config[0].currentWeek;

    try {
    const weeklyOdds = await Odd.findAll({
        where: {
            week: currentWeek
        },
        order: [
            ['id', 'ASC']
        ]
    });

    for(let i = 0 ; i < weeklyOdds.length; i++) {
        console.log(weeklyOdds[i]);
    }

    return res.json(weeklyOdds);
} catch(err) {
    return res.status(404).json({
        message: 'Error'
    })
}

});

module.exports = router;