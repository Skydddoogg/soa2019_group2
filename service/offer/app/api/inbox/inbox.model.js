const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Offer = require('../offer/offer.model');

const InboxSchema = new mongoose.Schema({
  _id: {type: ObjectId, required: true}, // Student ID
  offerlist: [Offer.schema]
});

module.exports = mongoose.model('Inbox', InboxSchema);