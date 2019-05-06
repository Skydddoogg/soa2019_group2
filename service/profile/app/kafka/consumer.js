const Profile = require('../api/profile/profile.model');

const kafka = require('kafka-node')
const KAFKA_URL = process.env.KAFKA_URL || 'localhost:9092';
const client = new kafka.KafkaClient({kafkaHost: KAFKA_URL});
const Consumer = kafka.Consumer;
const consumer = new Consumer(client, [{
  topic: 'initprofile',
  offset: 0,
}], {
  autoCommit: true
});

consumer.on('message', function (message) {
  console.log(message);
  var jsonMsg = JSON.parse(message.value);
  initProfile(jsonMsg);
});

consumer.on('error', function (err) {
  console.log('Error:', err);
})

consumer.on('offsetOutOfRange', function (err) {
  console.log('offsetOutOfRange:', err);
})

initProfile = (jsonMsg) => {
  var profile = new Profile({
    '_id': jsonMsg.data.id,
    'userType': jsonMsg.data.userType,
    'firstname': jsonMsg.data.firstname,
    'lastname': jsonMsg.data.lastname,
    'email': jsonMsg.data.email,
    'phoneNumber': jsonMsg.data.phoneNumber
  });
  profile.save();
}