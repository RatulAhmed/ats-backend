const express = require('express');
const https = require('https');
const router = express.Router();

const Odd = require('../models/odd');

const apiKey = '4123da3ce51d33a0a5733928bda4fdbe';
const url = 'https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?regions=us&oddsFormat=american&markets=spreads&apiKey='


router.get('/updateOdd', async(req, res, next) => {
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
                    week: '3' //TODO this needs to come from config tables
                }})
            }
        })
        res.on("error", err => {                           
            console.log(err);
        })

    })
    return res.json({ message: 'Successfully updated the odds'});
})


// we need a a route to trigger - update scores


// we need a route to trigger - lock all odds for current week - lock odd for thursday?


module.exports = router;