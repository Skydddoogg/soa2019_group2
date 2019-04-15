require('module-alias/register')
require('@kafka/consumer');

const Profile = require('./profile.model');

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.userid);
    if (!profile) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json({ profile });
  } catch(error) {
    return res.status(404).json({ message: 'Not found', error: error });
  }
};

exports.editProfile = async (req, res) => {
  const profile = await Profile.findByIdAndUpdate(req.params.userid, req.body, {new: true});
  if (!profile) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(200).json({ profile });
};
