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
1. Sign up new user with an information from request body

 * ```POST /signup```

    ```
    /* Example of request body */
    {
        username: 'nishino_nanase"
        password: 'exampleofverysecurepassword'
        firstname: 'nanase'
        lastname: 'nishino'
        email: 'naachan@example.com'
        userType: 'tutor'
        phoneNumber: '0801234567'
    }
    ```

   Return ```201 CREATED``` with an information of new user

   Return ```500 INTERNAL SERVER ERROR```  with an error message if the request body is missing required key value or something went wrong on the server
---
2. Sign in with an exist username

 * ```POST /signin```

    ```
    /* Example of request body */
    {
        username: 'nishino_nanase"
        password: 'exampleofverysecurepassword'
    }
    ```

   Return ```200 OK``` with a user information payload and bearer token if sign in is success

   Return ```500 INTERNAL SERVER ERROR``` with an error message if username or password is invalid or something went wrong on the server
---