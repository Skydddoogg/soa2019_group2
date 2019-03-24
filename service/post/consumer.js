// const kafka = require('kafka-node')
// const client = new kafka.KafkaClient({kafkaHost: '35.187.249.119:9092'})
// const Consumer = kafka.Consumer
// const consumer = new Consumer(client, [{
//   topic: 'post',
//   offset: 0
// }], {
//   autoCommit: true
// });

// consumer.on('message', function (message) {
//   console.log(JSON.parse(message.value));
// });

// consumer.on('error', function (err) {
//   console.log('Error:', err);
// })

// consumer.on('offsetOutOfRange', function (err) {
//   console.log('offsetOutOfRange:', err);
// })
