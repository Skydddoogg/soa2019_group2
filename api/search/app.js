var express = require('express');
var app = express();
var db  = require('./db');

var SearchRouter = require('./routes/search.route');
app.use('/search', SearchRouter);

module.exports = app;