require('module-alias/register');
require('@conf/config');

const mongoose = require('mongoose');
const connectionString = `mongodb://${global.gConfig.db_host}:${global.gConfig.db_port}/${global.gConfig.db_name}`;

var connectWithRetry = function() {
  console.log('Search service is connecting database at: ' + connectionString);
  return mongoose.connect(connectionString, { useNewUrlParser: true, useFindAndModify: false }, function(err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec ', err);
      setTimeout(connectWithRetry, 5000);
    }
  });
};
connectWithRetry();