const express = require('express');

const app = express();
const db = require('./config/database');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const oddRoutes = require('./routes/odd');

/* Database Connection */
db
  .authenticate()
  .then(() => {
      console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    'Unable to connect to the database:', err
  });  

/* Middleware */
app.use(express.json())
app.use(cors());
app.options('*', cors());

/* Routes */
app.use('/api/auth', authRoutes);
app.use('/api/odd', oddRoutes);
module.exports = app;