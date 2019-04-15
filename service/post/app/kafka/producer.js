const kafka = require('kafka-node');
const KAFKA_URL = process.env.KAFKA_URL || 'localhost:9092'
const client = new kafka.KafkaClient({kafkaHost: KAFKA_URL});
const Producer = kafka.Producer
const producer = new Producer(client);

producer.on('ready', function () {
  console.log('Producer is ready, Kafka host: ' + KAFKA_URL);
});

producer.on('error', function (err) {
  console.log('Producer is in error state');
  console.log(err);
})

exports.send = (method, sentMessage) => {
  var msg = JSON.stringify({'method': method, 'data': sentMessage});
  var payloads = [{ topic: "post", messages: msg, partition: 0 }];
  producer.send(payloads, function (err, data) {
     console.log("send data ", sentMessage);
  });
} 