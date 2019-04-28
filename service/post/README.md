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
1. Get a post by post ID

 * ```GET /:postid```

   Return ```200 OK``` with information of post when given an exists post ID

   Return ```404 NOT FOUND```  when given non-exists post ID
---
2. Create a post with information from request body

    __*Require valid bearer token on HTTP header before using__

* ```POST /create```

    ```
    /* Example of request body */
    {
        subject: 'math',
        level: 'upper-secondary',
        startTime: '8.00',
        endTime: '12.00',
        location: 'Mega Bangna',
        expectPrice: '300',
        detail: 'This is an example of detail',
    }
    ```
    Return ```201 CREATED``` with information of created post

    Return ```401 UNAUTHORIZED``` if there is no bearer token on HTTP header

    Return ```500 INTERNAL SERVER ERROR``` with an error message if the request body is missing required key value or something went wrong on the server
---
3. Update an exists post with information from request body

    __*Require valid bearer token on HTTP header before using__

    __*Only post owner can update__

* ```PUT /update/:postid```

    ```
    /* Example of request body */
    {
        subject: 'science',
        level: 'lower-secondary',
        startTime: '9.00',
        endTime: '13.00',
        location: 'KMITL',
        expectPrice: '400',
        detail: 'This is an example of detail',
    }
    ```
    Return ```200 OK``` with information of edited post

    Return ```401 UNAUTHORIZED``` if there is no bearer token on HTTP header

    Return ```403 FORBIDDEN``` if there is bearer token on HTTP header but it's not post owner

    Return ```404 NOT FOUND``` if post ID is not exists

    Return ```500 INTERNAL SERVER ERROR``` with an error message if the request body is missing required key value or something went wrong on the server
---
4. Delete an exists post

    __*Require valid bearer token on HTTP header before using__

    __*Only post owner can delete__

* ```DELETE /delete/:postid```

    Return ```200 OK``` with information of deleted post

    Return ```401 UNAUTHORIZED``` if there is no bearer token on HTTP header

    Return ```403 FORBIDDEN``` if there is bearer token on HTTP header but it's not post owner

    Return ```404 NOT FOUND``` if post ID is not exists
---