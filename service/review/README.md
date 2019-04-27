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
1. Create a new review with information from request body

    __*Require valid bearer token on HTTP header before using__

    __*Only user type student can create a new review__

 * ```POST /create```

    ```
    /* Example of request body */
    {
        targetId: '<ObjectId>',
        targetUsername: 'shimazaki_haruka',
        targetType: 'tutor',
        message: 'Very good tutor and cute',
        profileImg: 'profile.image.example.com'
    }
    ```
    
    Return ```201 CREATED``` with information of new review

    Return ```401 UNAUTHORIZED``` if there is no bearer token on HTTP header

    Return ```403 FORBIDDEN``` if there is bearer token on HTTP header but user type is not student 

   Return ```500 INTERNAL SERVER ERROR```  with an error message if the request body is missing required key value or something went wrong on the server
---
2. Get a list of review by tutor user ID (Target ID)

 * ```GET /reviews/:targetid```

   Return ```200 OK``` with a list of review when given an exists target ID that having some review on the database or return with an empty list when given non-exists target ID or an exists target ID but haven't any review
---