var express = require('express');
var app = express();
var db  = require('./db');
var TutorRouter = require('./routes/tutor.route');

app.use('/tutor', TutorRouter);

module.exports = app;