const express = require('express');
const router = express.Router();

const Odd = require('../models/odd');
const Nfl_config = require('../models/nfl_config');

router.get('/', async (req, res, next) => {
    try {
        nfl_config = await Nfl_config.findAll({
            attributes: ['currentWeek'],
            raw: true
        })
    } catch(err) {
        console.log(err);
    }
     const currentWeek  = nfl_config[0].currentWeek;

    try {
    const weeklyOdds = await Odd.findAll({
        where: {
            week: currentWeek
        }
    });
    return res.json(weeklyOdds);
} catch(err) {
    return res.status(404).json({
        message: 'Error'
    })
}

});

module.exports = router;