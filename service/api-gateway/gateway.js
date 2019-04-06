const express = require('express');
const httpProxy = require('express-http-proxy');
const request = require('request-promise-native');
const xml = require('xml');
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

  // Shared general logic: Authentication
  app.use((req, res, next) => {
    // TODO: authentication logic
    console.log(`Authentication: ${req.path}`)
    next()
  });

  // Aggregate services after authentication
  app.get('/', async (req, res) => {
    const services = await Promise.all([
      request({ uri: postServiceUrl, json: true }),
      request({ uri: searchServiceUrl, json: true })
    ]);
    const response = { services };

    // Format transformation: XML or JSON
    if (req.get('Content-Type') === 'application/xml') {
      const xmlResponse = xml(response)
      res.set('content-type', 'text/xml')
      res.end(xmlResponse)
    } else {
      res.json(response)
    }
  });

  // Proxy request after authentication
  app.use('/api/post', (req, res, next) => {
    postServiceProxy(req, res, next);
  });

  app.use('/api/search', (req, res, next) => {
    searchServiceProxy(req, res, next);
  });

});

app.listen(PORT, HOST);
console.log(`Running API gateway on http://${HOST}:${PORT}`);