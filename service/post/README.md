# Deployment on Google Cloud

```http://35.221.225.113:3000/api/post/{endpoint}```

# APIs

* ```POST /create```
* ```PUT /update/:id```
* ```DELETE /delete/:id```

# How to run

* Step 1: ดาวน์โหลด Kafka code จาก https://www-us.apache.org/dist/kafka/2.2.0/kafka_2.12-2.2.0.tgz
* Step 2: แตกไฟล์ที่โหลดมาไว้ที่ใดก็ได้
* Step 3: ใช้ command line เข้าไปที่โฟล์เดอร์ที่แตกไฟล์ออกมาแล้วรันคำสั่ง ```bin/zookeeper-server-start.sh config/zookeeper.properties```
* Step 4: เปิดแท็ปใหม่ของ command line แล้วเข้าที่โฟล์เดอร์นั้นเหมือนเดิม จากนั้นรันคำสั่ง ```bin/kafka-server-start.sh config/server.properties```
* Step 5: เปิดแท็ปใหม่ของ command line แล้วเข้าที่โฟล์เดอร์นั้นเหมือนเดิม จากนั้นรันคำสั่ง ```bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic post``` เพื่อสร้าง Topic
* Step 6: เปิดแท็ปใหม่ของ command line แล้วเข้ามาที่โฟล์เดอร์ของ Post service แล้วรันคำสั่ง ```npm run dev``` เพื่อรันเซิฟเวอร์

# How to Test APIs

To test this service just perform this ```npm run test```

Note that you need to install node modules for the first time you test. You can perform ```npm install``` to do so.

This is [API document](https://github.com/Skydddoogg/soa2019_group2/blob/master/service/post/API_Doc.md) for this service.
