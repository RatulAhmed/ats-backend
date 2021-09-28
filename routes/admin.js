const express = require('express');
const https = require('https');
const router = express.Router();

const Odd = require('../models/odd');
const Score = require('../models/score')
const Choice = require('../models/user_choice');
const Config = require('../models/nfl_config');
const apiKey = '4123da3ce51d33a0a5733928bda4fdbe';
const url = 'https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?regions=us&oddsFormat=american&markets=spreads&apiKey='


router.get('/updateOdd', async(req, res, next) => {

    const config = await Config.findOne({
        where : {
            id: 1,
        },
        attributes: ['currentWeek']
    })

    const numGames = 0;
    console.log(config.currentWeek)

    let data = "";
    https.get(url + '' + apiKey, res =>{
        
        res.on("data", chunk => {
            data += chunk;
        });

        res.on("end", () => {
            let json = JSON.parse(data); 
            let homeTeam, awayTeam, homeSpread, awaySpread;
            
            /* TODO - currently hardcoded as 16 - get number of games for the curr week */
            for(i = 0; i < 16; i++) {
                homeTeam = json[i].home_team;
                awayTeam = json[i].away_team;

                if(json[i].home_team === homeTeam && json[i].away_team === awayTeam) {
                    if(homeTeam === json[i].bookmakers[2].markets[0].outcomes[0].name) {
                        homeSpread = json[i].bookmakers[2].markets[0].outcomes[0].point;
                        awaySpread = json[i].bookmakers[2].markets[0].outcomes[1].point
                    }
                    else if(homeTeam === json[i].bookmakers[2].markets[0].outcomes[1].name) {
                        awaySpread = json[i].bookmakers[2].markets[0].outcomes[0].point
                        homeSpread = json[i].bookmakers[2].markets[0].outcomes[1].point;
                    }
                }
                Odd.update({
                    home_spread: homeSpread,
                    away_spread: awaySpread
                }, { where: {
                    home_team: homeTeam,
                    away_team: awayTeam,
                    week: config.currentWeek //TODO this needs to come from config tables
                }})
            }
        })
        res.on("error", err => {                           
            console.log(err);
        })

    })
    return res.json({ message: 'Successfully updated the odds'});
})


// this will only ever be called after scores have been already updated
router.get('/updateScores',async(req, res, next) => {
    try {
    let odds = await Choice.findAll({
        where : {
        },
        include:[{ 
            attributes: ['winner'],
            model: Odd,
            where: { week:'3'}
        }],
    })

    let map = new Map();
    for(let i = 0; i < odds.length; i++) {
        if(map.get(odds[i].user_id) === undefined) {
            map.set(odds[i].user_id, 0);
            let currPoints = map.get(odds[i].user_id);
            if(odds[i].selection === odds[i].odd.winner) {
                map.set(odds[i].user_id, 1 + currPoints);
            }
            if (odds[i].odd.winner === 'Push') {
                map.set(odds[i].user_id, 0.5 + currPoints);
            }
        }
        else {
            let currPoints = map.get(odds[i].user_id);
            if(odds[i].selection === odds[i].odd.winner) {
                map.set(odds[i].user_id, 1 + currPoints);
            } 
            if (odds[i].odd.winner === 'Push') {
                map.set(odds[i].user_id, 0.5 + currPoints);
            }
        }
    }    
    for(const [key,value] of map.entries()) {
        console.log(key, value)
        try {
            await Score.increment({
                score: + value,
            }, 
            {
                where : {
                    user_id: key
                }
            })
        } catch(err) {
            console.log(err)
        }
    }
    return res.json('Scores have been updated');
} catch(err) {
    return res.json(err);
}
})


// we need a route to trigger - lock all odds for current week - lock odd for thursday?


module.exports = router;