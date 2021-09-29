const express = require('express');
const router = express.Router();

const Score = require('../models/score');
const User = require('../models/user');

router.get('', async (req, res, next) => {

    try {
        const scores = await Score.findAll({
            include: [{
                model: User,
                attributes: ['username']
            }],
            attributes : ['score'],
            order: [
                ['score', 'DESC']
            ]
        });
        return res.json(scores);
    } catch(err) {
        console.log(err);
        return res.json(err);
    }
})


module.exports = router;