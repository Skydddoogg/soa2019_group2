require('module-alias/register')
require('@kafka/consumer');

const OfferInbox = require('./inbox.model');
const Offer = require('../offer/offer.model');

exports.getOfferInbox = async (req, res) => {
  try {
    const offerInbox = await OfferInbox.findById(req.params.studentid);
    if (!offerInbox) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json({ offerInbox });
  } catch(error) {
    return res.status(404).json({ message: 'Not found', error: error });
  }
};

exports.markAsReadedOffer = async (req, res) => {
  const studentId = req.params.studentid;
  const offerIndex = req.params.offerindex;
  try {
    const offerInbox = await OfferInbox.findById(studentId);
    if (!offerInbox) {
      return res.status(404).json({ message: 'Not found' });
    }
    offerInbox.offerlist[offerIndex].mark = 'readed';
    offerInbox.save();
    return res.status(200).json({ offer: offerInbox.offerlist[offerIndex] });
  } catch(error) {
    return res.status(404).json({ message: 'Not found', error: error });
  }
};

exports.createOffer = async (req, res) => {
  const offer = new Offer({
    postId: req.body.postId,
    tutorId: req.body.tutorId,
    tutorUsername: req.body.tutorUsername
  });
  const offerInbox = await OfferInbox.findByIdAndUpdate(req.body.studentId, 
    { '$push': { 'offerlist': offer } });
  if (!offerInbox) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(201).json({ offer });
};
