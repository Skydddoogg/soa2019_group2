require('module-alias/register');
require('@conf/config');

const PostSearch = require('../search.post.model');

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
  var jsonMsg = JSON.parse(message.value);
  // console.log(jsonMsg);
  updateData(jsonMsg);
});

consumer.on('error', function (err) {
  console.log('Error:', err);
})

consumer.on('offsetOutOfRange', function (err) {
  console.log('offsetOutOfRange:', err);
})

updateData = (jsonMsg) => {
  var post = new PostSearch({
    "_id": jsonMsg._id,
    "subject": jsonMsg.subject,
    "level": jsonMsg.level,
    "startTime": jsonMsg.startTime,
    "endTime": jsonMsg.endTime,
    "location": jsonMsg.location,
    "expectPrice": jsonMsg.expectPrice,
    "detail": jsonMsg.detail,
    "creatorId": jsonMsg.creatorId,
    "creatorUsername": jsonMsg.creatorUsername,
    "creatorType": jsonMsg.creatorType,
    "updatedAt": jsonMsg.updatedAt,
    "createdAt": jsonMsg.createdAt
  })
  console.log(post);
  post.save((err) => {if (err) console.log (err)});
}