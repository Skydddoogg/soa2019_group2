require('module-alias/register');
require('@conf/config');

const kafka = require('kafka-node');
const client = new kafka.KafkaClient({kafkaHost: `${global.gConfig.kafka_host}:${global.gConfig.kafka_port}`});
const Producer = kafka.Producer
const producer = new Producer(client);

producer.on('ready', function () {
  console.log('Producer is ready');
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