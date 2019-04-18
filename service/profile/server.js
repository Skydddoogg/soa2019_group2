const ENV = process.env.NODE_ENV || 'development';

require('custom-env').env(ENV);
require('module-alias/register');
require('@conf/db');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Eureka = require('eureka-js-client').Eureka;
const cors = require('cors');
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// We won't include the Eureka client in testing
if (ENV === 'test') {
  require('./app/routes')(app);
} else {
  const client = new Eureka({
    // Application instance information
    instance: {
      app: 'profile-service',
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      statusPageUrl: 'http://localhost:' + PORT,
      vipAddress: 'profile-service',
      port: {
        $: PORT,
        '@enabled': 'true',
      },
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
      registerWithEureka: true,
      fetchRegistry: true,
      leaseRenewalIntervalInSeconds: 1,
      leaseExpirationDurationInSeconds: 2
    },
    eureka: {
      // Eureka server
      host: 'localhost',
      port: 8761,
      servicePath: '/eureka/apps/',
    },
  });
  client.logger.level('debug');
  client.start((error) => {
    console.log(error || 'Eureka client started');
    require('./app/routes')(app);
  });
}

app.listen(PORT);
console.log('Profile service is listening on port: ' + PORT);

module.exports = app;