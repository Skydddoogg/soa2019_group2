require('module-alias/register');
require('@conf/db');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const expressValidator = require('express-validator');

const port = global.gConfig.port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressValidator());

require('./app/routes')(app);

app.listen(port);
console.log('Auth service is listening on port: ' + port);