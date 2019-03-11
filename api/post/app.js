var express = require('express');
var app = express();
var db  = require('./db');

var PostRouter = require('./routes/post.route');
app.use('/posts', PostRouter);

module.exports = app;