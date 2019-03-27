# Deployment on Google Cloud

```http://35.221.225.113:3000/api/post/{endpoint}```

# APIs

* ```POST /create```
* ```PUT /update/:id```
* ```DELETE /delete/:id```

# How to run

* Step 1: Follow step 1 (download the code) and step 2 (start the server) in [Quickstarting on Kafka](https://kafka.apache.org/quickstart)
   * ในขั้นตอน start the server ให้เข้าไปใน folder ที่ download มา แล้วรันคำสั่ง ```bin/zookeeper-server-start.sh config/zookeeper.properties``` และ ```bin/kafka-server-start.sh config/server.properties``` ไว้คนละ tab ของ command line
* Step 2: In another tab of command line, go to source directory of Kafka and execute this ```bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic post``` to create a topic.
* Step 3: In another tab of command line, execute this ```npm run dev``` for running this service as a development or ```npm run start``` for deployment.

# How to Test APIs

To test this service just perform this ```npm run test```

Note that you need to install node modules for the first time you test. You can perform ```npm install``` to do so.

This is [API document](https://github.com/Skydddoogg/soa2019_group2/blob/master/service/post/API_Doc.md) for this service.
