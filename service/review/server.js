require('./conf/db');
require('module-alias/register')

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes')(app);

app.listen(port);
console.log('Review service is listening on port: ' + port);

module.exports = app;