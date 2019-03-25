const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const alias = require('module-alias/register');
const db  = require('@conf/db');

const port = global.gConfig.port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

require('./app/routes')(app);

app.listen(port);
console.log('Post service is listening on port: ' + port);