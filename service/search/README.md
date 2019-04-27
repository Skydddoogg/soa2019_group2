# Running
1. Install Node.js, Mongo before running or testing
2. Install all dependencies
* ```npm install```
3. Run the service with the development environment
* ```npm run dev```

__Note:__ Run the service with the production environment, please run via docker-compose

# Testing
Running test with Chai and Mocha
* ```npm run test```

# Endpoints
1. Get all post by user ID

* ```GET /:userid/allposts```

   Return ```200 OK``` with a list of post when given an exists user ID that having some post on the database or return with an empty list when given non-exists user ID or an exists user ID but haven't any post
---