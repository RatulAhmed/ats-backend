const express = require('express');

const app = express();

app.use('', (req, res, next) => {
    const myRes = 
    {
        message: "Hello from the server"
    }
    res.status(200).json(myRes);
})

module.exports = app;