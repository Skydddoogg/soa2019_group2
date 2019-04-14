require('custom-env').env(process.env.NODE_ENV || 'development');

const express = require('express');
const httpProxy = require('express-http-proxy');
const passport = require('passport');
const Eureka = require('eureka-js-client').Eureka;

// Constants
const PORT = process.env.PORT || 3000
const HOST = '0.0.0.0';
const app = express();

// Configuration
const client = new Eureka({
  // application instance information
  instance: {
    app: 'api-gateway',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: 'http://localhost:' + PORT,
    vipAddress: 'api-gateway',
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

// required for passport
app.use(passport.initialize());
app.use(passport.session());
require('./conf/passport')(passport);

client.logger.level('debug');
client.start(error => {
  console.log(error || 'Eureka client started');

  // Service discovery from Eureka server
  const postServiceInstance = client.getInstancesByAppId('post-service');  
  const postServiceUrl = `http://${postServiceInstance[0].hostName}:${postServiceInstance[0].port.$}`;
  const postServiceProxy = httpProxy(postServiceUrl);
  console.log(`Post-service: ${postServiceUrl}`);

  const searchServiceInstance = client.getInstancesByAppId('search-service');  
  const searchServiceUrl = `http://${searchServiceInstance[0].hostName}:${searchServiceInstance[0].port.$}`;
  const searchServiceProxy = httpProxy(searchServiceUrl);
  console.log(`Search-service: ${searchServiceUrl}`);

  const authServiceInstance = client.getInstancesByAppId('auth-service');  
  const authServiceUrl = `http://${authServiceInstance[0].hostName}:${authServiceInstance[0].port.$}`;
  const authServiceProxy = httpProxy(authServiceUrl);
  console.log(`Auth-service: ${authServiceUrl}`);

  const offerServiceInstance = client.getInstancesByAppId('offer-service');  
  const offerServiceUrl = `http://${offerServiceInstance[0].hostName}:${offerServiceInstance[0].port.$}`;
  const offerServiceProxy = httpProxy(offerServiceUrl);
  console.log(`Offer-service: ${offerServiceUrl}`);

  // Proxy request after authentication
  app.use('/api/post', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    postServiceProxy(req, res, next);
  });

  app.use('/api/search', (req, res, next) => {
    searchServiceProxy(req, res, next);
  });

  app.use('/api/auth', (req, res, next) => {
    authServiceProxy(req, res, next);
  });

  app.use('/api/offer', (req, res, next) => {
    offerServiceProxy(req, res, next);
  });

});

app.listen(PORT, HOST);
console.log(`Running API gateway on http://${HOST}:${PORT}`);