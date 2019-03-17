# How to Test APIs of Post Service

## Follow these steps
* Step 1: Import mocked database by running this ```mongoimport --db post_service --collection posts --file mocked_db.json```
   * Note that MongoDB need to be installed. You can easily install it via ```brew install mongodb``` and you will need to make connection befor you import.
* Step 2: Install node modules via ```npm install```
* Step 3: Run the server with ```npm run dev```
* Step 4: Run the test with ```cotton -u http://localhost:3000 API_Doc.md```
   * Note that [Cotton](https://github.com/chonla/cotton) (Markdown Test Specification Runner) need to be installed.
   * In API_Doc.md (API document) you can see API information of this service.
