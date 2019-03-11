var express = require('express');
var expressValidator = require('express-validator');
var app = express();
var db  = require('./db');

var PostRouter = require('./routes/post.route');
app.use(expressValidator());
app.use('/posts', PostRouter);

module.exports = app;