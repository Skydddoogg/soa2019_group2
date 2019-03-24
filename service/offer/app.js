var express = require('express');
var app = express();
var db  = require('./db');
var OfferRouter = require('./routes/offer.route');

app.use('/offer', OfferRouter);

module.exports = app;