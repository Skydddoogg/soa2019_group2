const KAFKA_URL = process.env.KAFKA_URL || 'localhost:9092'
const PostSearch = require('../api/search/search.post.model');

const kafka = require('kafka-node')
const client = new kafka.KafkaClient({kafkaHost: KAFKA_URL})
const Consumer = kafka.Consumer
const consumer = new Consumer(client, [{
  topic: 'post',
  offset: 0,
}], {
  autoCommit: true
});

consumer.on('message', function (message) {
  // console.log(message);
  var jsonMsg = JSON.parse(message.value);
  updateData(jsonMsg);
});

consumer.on('error', function (err) {
  console.log('Error:', err);
})

consumer.on('offsetOutOfRange', function (err) {
  console.log('offsetOutOfRange:', err);
})

updateData = (jsonMsg) => {
  var method = jsonMsg.method;
  var post = new PostSearch({
    "_id": jsonMsg.data._id,
    "subject": jsonMsg.data.subject,
    "level": jsonMsg.data.level,
    "startTime": jsonMsg.data.startTime,
    "endTime": jsonMsg.data.endTime,
    "location": jsonMsg.data.location,
    "expectPrice": jsonMsg.data.expectPrice,
    "detail": jsonMsg.data.detail,
    "creatorId": jsonMsg.data.creatorId,
    "creatorUsername": jsonMsg.data.creatorUsername,
    "creatorType": jsonMsg.data.creatorType,
    "updatedAt": jsonMsg.data.updatedAt,
    "createdAt": jsonMsg.data.createdAt
  })

  console.log("METHOD: " + method + "\n DATA: " + post);

  switch (method) {
    case "create": {
      PostSearch.create(post)
      .then( (post, err) => {
        if (err) {
          console.log("Status: error\n" + err);
        } else {
          console.log("Status: created success");
        }
      });
      break;
    }
    case "update": {
      PostSearch.findByIdAndUpdate(post._id, post, {new: true})
      .then( (post, err) => {
        if (err) {
          console.log("Status: error\n" + err);
        } else {
          console.log("Status: updated success");
        }
      });
      break;
    }
    case "delete": {
      PostSearch.findByIdAndDelete(post._id)
      .then( (post, err) => {
        if (err) {
          console.log("Status: error\n" + err);
        } else {
          console.log("Status: deleted success");
        }
      });
      break;
    }
  }
}