const Inbox = require('../api/inbox/inbox.model');

const kafka = require('kafka-node')
const KAFKAURL = process.env.KAFKA_URL || 'localhost:9092';
const client = new kafka.KafkaClient({kafkaHost: KAFKAURL});
const Consumer = kafka.Consumer;
const consumer = new Consumer(client, [{
  topic: 'initofferinbox',
  offset: 0,
}], {
  autoCommit: true
});

consumer.on('message', function (message) {
  console.log(message);
  var jsonMsg = JSON.parse(message.value);
  initOfferInbox(jsonMsg);
});

consumer.on('error', function (err) {
  console.log('Error:', err);
})

consumer.on('offsetOutOfRange', function (err) {
  console.log('offsetOutOfRange:', err);
})

initOfferInbox = (jsonMsg) => {
  var inbox = new Inbox({
    "_id": jsonMsg.id,
  });
  inbox.save();
}