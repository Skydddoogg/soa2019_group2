require('module-alias/register');
require('@conf/config');

const mongoose = require('mongoose');

const connectionString = `mongodb://${global.gConfig.db_host}:${global.gConfig.db_port}/${global.gConfig.db_name}`;
console.log(connectionString);
mongoose.connect(connectionString, { useNewUrlParser: true, useFindAndModify: false });