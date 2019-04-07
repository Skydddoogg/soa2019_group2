require('custom-env').env(process.env.NODE_ENV || 'development');
require('./conf/db');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const Eureka = require('eureka-js-client').Eureka;
const PORT = process.env.PORT || 3003;

const client = new Eureka({
  // Application instance information
  instance: {
    app: 'auth-service',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: 'http://localhost:' + PORT,
    vipAddress: 'auth-service',
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// required for passport
app.use(passport.initialize());
app.use(passport.session());
require('./conf/passport')(passport);

client.logger.level('debug');
client.start(error => {
  console.log(error || 'Eureka client started');
  require('./app/routes')(app);
});

// require('./app/routes')(app);

app.listen(PORT);
console.log('Auth service is listening on port: ' + PORT);