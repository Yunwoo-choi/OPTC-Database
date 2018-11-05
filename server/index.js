const express = require('express');
const app = express();

const fs            = require('fs');
const path          = require('path');
const mongomorgan   = require('mongo-morgan')
const logger        = require('morgan');

const characters = require('./routes/characters')

require('dotenv').load();
require('./config/db');

app.use(express.json()); //for parsing application/json
app.use(express.urlencoded({extended: true})) //for parsing application/x-222-2form-urlendoded

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use('/', characters)

app.use(logger('dev')); //write to console
app.use(logger('combined', {stream: accessLogStream})); //writes to a file
app.use(mongomorgan(process.env.DB_URL, 'dev'));


app.listen(3000, () => console.log('optc app listening on port 3000!'));

module.exports = app;