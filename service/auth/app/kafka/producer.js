const kafka = require('kafka-node');
const KAFKAURL = process.env.KAFKA_URL || 'localhost:9092'
const client = new kafka.KafkaClient({kafkaHost: KAFKAURL});
const Producer = kafka.Producer
const producer = new Producer(client);

producer.on('ready', function () {
  console.log('Producer is ready, Kafka host: ' + KAFKAURL);
});

producer.on('error', function (err) {
  console.log('Producer is in error state');
  console.log(err);
})

exports.send = (method, sentMessage) => {
  var msg = JSON.stringify({'id': sentMessage});
  switch (method) {
    case 'initprofile': {
      var payloads = [{ topic: 'initprofile', messages: msg, partition: 0 }];
      break;
    }
    case 'initofferinbox': {
      var payloads = [{ topic: 'initofferinbox', messages: msg, partition: 0 }];
      break;
    }
  }
  producer.send(payloads, (err, data) => {
     console.log("Payloads: ", payloads);
  });
} 