# How to run

* Step 1: Import mocked database by running this ```mongoimport --db search_service --collection posts --file search_service_mocked_db.json```
   * Note that MongoDB need to be installed. You can easily install it via ```brew install mongodb``` and you will need to make connection befor you import.
* Step 2: Install node modules via ```npm install```
* Step 3: Run the server with ```npm run start```

# How to Test APIs (service must be running)

* Step 1: Run the test with ```cotton -u http://localhost:3000 API_Doc.md```
   * Note that [Cotton](https://github.com/chonla/cotton) (Markdown Test Specification Runner) need to be installed.
   * In [API document](https://github.com/Skydddoogg/soa2019_group2/blob/master/service/search/API_Doc.md) you can see API information of this service.
