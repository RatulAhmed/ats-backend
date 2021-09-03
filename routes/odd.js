const express = require('express');
const https = require('https');
const router = express.Router();

const apiKey = '4123da3ce51d33a0a5733928bda4fdbe';
const url = 'https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?regions=us&oddsFormat=american&markets=spreads&apiKey='


router.get('', async(req, res, next) => {
    let data = "";
    https.get(url + '' + apiKey, res =>{
        
        res.on("data", chunk => {
            data += chunk;
        });

        res.on("end", () => {
            console.log(data);
        })

        res.on("error", err => {
            console.log(err);
        })

    })
    return res.json({message: 'sucess'});
})


module.exports = router;