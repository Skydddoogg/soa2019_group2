const ENV = process.env.NODE_ENV || 'development'
require('custom-env').env(ENV);

const express = require('express');
const httpProxy = require('express-http-proxy');
const Eureka = require('eureka-js-client').Eureka;
const cors = require('cors');

// Constants
const PORT = process.env.PORT || 3000
const HOST = '0.0.0.0';
const app = express();

// Configuration
const client = new Eureka({
  // application instance information
  instance: {
    app: 'api-gateway',
    hostName: process.env.EUREKA_CLIENT_HOST || 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: (process.env.EUREKA_CLIENT_URL || 'http://localhost:') + PORT,
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
    host: process.env.EUREKA_SERVER_HOST || 'localhost',
    port: process.env.EUREKA_SERVER_PORT || 8761,
    servicePath: '/eureka/apps/',
  },
});

app.use(cors());

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

  const reviewServiceInstance = client.getInstancesByAppId('review-service');  
  const reviewServiceUrl = `http://${reviewServiceInstance[0].hostName}:${reviewServiceInstance[0].port.$}`;
  const reviewServiceProxy = httpProxy(reviewServiceUrl);
  console.log(`Review-service: ${reviewServiceUrl}`);

  const offerServiceInstance = client.getInstancesByAppId('offer-service');  
  const offerServiceUrl = `http://${offerServiceInstance[0].hostName}:${offerServiceInstance[0].port.$}`;
  const offerServiceProxy = httpProxy(offerServiceUrl);
  console.log(`Offer-service: ${offerServiceUrl}`);

  const profileServiceInstance = client.getInstancesByAppId('profile-service');  
  const profileServiceUrl = `http://${profileServiceInstance[0].hostName}:${profileServiceInstance[0].port.$}`;
  const profileServiceProxy = httpProxy(profileServiceUrl);
  console.log(`Profile-service: ${profileServiceUrl}`);

  // Proxy request
  app.use('/api/post', (req, res, next) => {
    postServiceProxy(req, res, next);
  });

  app.use('/api/search', (req, res, next) => {
    searchServiceProxy(req, res, next);
  });

  app.use('/api/auth', (req, res, next) => {
    authServiceProxy(req, res, next);
  });

  app.use('/api/review', (req, res, next) => {
    reviewServiceProxy(req, res, next);
  });

  app.use('/api/offer', (req, res, next) => {
    offerServiceProxy(req, res, next);
  });

  app.use('/api/profile', (req, res, next) => {
    profileServiceProxy(req, res, next);
  });

  // For auto deploy demonstration
  app.use('/helloworld', (req, res, next) => {
    res.status(200).json({ message: 'hello world' });
  });

});

app.listen(PORT, HOST);
console.log(`Running API gateway on http://${HOST}:${PORT}`);