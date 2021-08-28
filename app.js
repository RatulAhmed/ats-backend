const express = require('express');

const app = express();

/**Middleware */
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
})

/* Routes  */
app.post('/api/auth/signup', (req, res, next) => {
    console.log(req.body);
    
    const myRes = 
    {
        message: "User has been created"
    }
    res.status(200).json(myRes);
})

module.exports = app;