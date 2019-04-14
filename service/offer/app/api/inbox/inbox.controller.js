require('module-alias/register')
require('@kafka/consumer');

const Inbox = require('./inbox.model');
const Offer = require('../offer/offer.model');

// TODO: Student get offer
// exports.getOffer = async (req, res) => {

// };

exports.createOffer = async (req, res) => {
  const offer = new Offer({
    postId: req.body.postId,
    tutorId: req.body.tutorId,
    tutorUsername: req.body.tutorUsername
  });
  const inbox = await Inbox.findByIdAndUpdate(req.body.studentId, 
    { "$push": { "offerlist": offer } });
  if (!inbox) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(200).json({ offer });
};
