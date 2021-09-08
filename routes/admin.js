const express = require('express');
const https = require('https');
const router = express.Router();

const Odd = require('../models/odd');
const { Op } = require('sequelize');

const apiKey = '4123da3ce51d33a0a5733928bda4fdbe';
const url = 'https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?regions=us&oddsFormat=american&markets=spreads&apiKey='


router.get('', async(req, res, next) => {
    let data = "";
    https.get(url + '' + apiKey, res =>{
        
        res.on("data", chunk => {
            data += chunk;
        });

        res.on("end", () => {
            let json = JSON.parse(data); 
            let homeTeam, awayTeam, homeSpread, awaySpread;
            // let dkOdds = json[0].bookmakers[2].markets[0].outcomes; 
            for(i = 0; i < 16; i++) {
                // console.log(json[i].bookmakers[2].markets[0].outcomes);
                // console.log('the Home team is ', json[i].home_team);
                // console.log('The away team is ', json[i].away_team)
                // console.log(json[i].bookmakers[2].markets[0]);
                homeTeam = json[i].home_team;
                awayTeam = json[i].away_team;

                console.log(homeTeam + ' ' + awayTeam);

                if(json[i].home_team === homeTeam && json[i].away_team === awayTeam) {
                    if(homeTeam === json[i].bookmakers[2].markets[0].outcomes[0].name) {
                        homeSpread = json[i].bookmakers[2].markets[0].outcomes[0].point;
                        awaySpread = json[i].bookmakers[2].markets[0].outcomes[1].point
                        console.log('We are setting the spread in first if: Homespread' + homeSpread + ' away spread '+ awaySpread);
                    }
                    else if(homeTeam === json[i].bookmakers[2].markets[0].outcomes[1].name) {
                        awaySpread = json[i].bookmakers[2].markets[0].outcomes[0].point
                        homeSpread = json[i].bookmakers[2].markets[0].outcomes[1].point;
                        console.log('We are setting the spread in else if: Homespread' + homeSpread + ' away spread '+ awaySpread);
                    }
                }
                Odd.update({
                    home_spread: homeSpread,
                    away_spread: awaySpread
                }, { where: {
                    home_team: homeTeam,
                    away_team: awayTeam,
                    week: '1' //TODO this needs to come from request
                }})
            }
        })
        res.on("error", err => {                           
            console.log(err);
        })

    })
    return res.json({message: 'sucess'});
})


module.exports = router;