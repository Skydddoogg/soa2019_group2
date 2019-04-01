require('module-alias/register');
require('@conf/db');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const port = global.gConfig.port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// required for passport
app.use(passport.initialize());
app.use(passport.session());
require('@conf/passport')(passport);

require('./app/routes')(app);

app.listen(port);
console.log('Auth service is listening on port: ' + port);