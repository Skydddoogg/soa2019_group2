require('custom-env').env(process.env.NODE_ENV || 'development')
require('./conf/db');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes')(app);

app.listen(port);
console.log('Post service is listening on port: ' + port);