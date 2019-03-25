const alias = require('module-alias/register');
const conf = require('@conf/config');

const kafka = require('kafka-node')
const client = new kafka.KafkaClient({kafkaHost: `${global.gConfig.kafka_host}:${global.gConfig.kafka_port}`})
const Consumer = kafka.Consumer
const consumer = new Consumer(client, [{
  topic: 'post',
  offset: 0
}], {
  autoCommit: true
});

consumer.on('message', function (message) {
  console.log(JSON.parse(message.value));
});

consumer.on('error', function (err) {
  console.log('Error:', err);
})

consumer.on('offsetOutOfRange', function (err) {
  console.log('offsetOutOfRange:', err);
})
