const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const db  = require('./conf/db');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

require('./app/routes')(app);

app.listen(3000);	
console.log('Listening on port: ' + port); 	