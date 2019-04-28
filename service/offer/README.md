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
1. Get a student offer inbox by student user ID

    __*Require valid bearer token on HTTP header before using__

    __*Only inbox owner can get a list of offer in the inbox__

 * ```GET /:studentid```
 
    Return ```200 OK``` with a list of offer when given an exists student ID that having some offer on the inbox or return with an empty list when given an exists student ID but haven't any offer in the inbox

    Return ```401 UNAUTHORIZED``` if there is no bearer token on HTTP header

    Return ```403 FORBIDDEN``` if there is bearer token on HTTP header but it's not an inbox owner

    Return ```404 NOT FOUND``` if student ID is not exists
---
2. Get an offer in the inbox by offer index

    __*Require valid bearer token on HTTP header before using__

    __*Only inbox owner can get a list of offer in the inbox__

 * ```GET /:studentid/:offerindex/```
 
    Return ```200 OK``` with information of offer and automatically mark as readed the offer

    Return ```401 UNAUTHORIZED``` if there is no bearer token on HTTP header

    Return ```403 FORBIDDEN``` if there is bearer token on HTTP header but it's not an inbox owner

    Return ```404 NOT FOUND``` if student ID is not exists or offer index is not exists
---
3. Create an offer

    __*Require valid bearer token on HTTP header before using__

    __*Only tutor can create an offer__

 * ```POST /create```

    ```
    /* Example of request body */
    {
        postId: '<ObjectId>',
        studentId: '<ObjectId>'
    }
    ```
 
    Return ```201 CREATED``` with information of created offer

    Return ```401 UNAUTHORIZED``` if there is no bearer token on HTTP header

    Return ```403 FORBIDDEN``` if there is bearer token on HTTP header but user type is not tutor

    Return ```404 NOT FOUND``` if student ID is not exists

    Return ```500 INTERNAL SERVER ERROR``` with an error message if the request body is missing required key value or something went wrong on the server
---