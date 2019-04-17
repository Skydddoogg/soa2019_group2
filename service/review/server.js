require('custom-env').env(process.env.NODE_ENV || 'development')
require('./conf/db');
require('module-alias/register')

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes')(app);

app.listen(PORT);
console.log('Review service is listening on port: ' + PORT);

module.exports = app;