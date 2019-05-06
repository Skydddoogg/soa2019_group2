require('module-alias/register');

const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator/check');
const User = require('./user.model');

const kafkaProducer = require('@kafka/producer');
const kafkaMethods = {
  INITOFFERINBOX: 'initofferinbox',
  INITPROFILE: 'initprofile'
}

const SECRET = process.env.SECRET_KEY;
const JWT_EXPIRATION_MS = 18000*1000; // 300 Minutes

exports.signup = async (req, res) => {

  // Validate profile information
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ error: errors.array() });
  }

  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (error, salt) => {
    bcrypt.hash(req.body.password, salt, async (error, hashedPassword) => {
      if (error) {
        return res.status(500).json({ error });
      }
      const userAuthData = new User({
        username: req.body.username,
        hashedPassword: hashedPassword,
        userType: req.body.userType
      });
      try {
        const user = await userAuthData.save();
        if (user.userType === 'student') {
          kafkaProducer.send(kafkaMethods.INITOFFERINBOX, user.id);
        }
        const userProfile = {
          id: user.id,
          username: req.body.username,
          userType: user.userType,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          highSchool: req.body.highSchool,
          bachelor: req.body.bachelor,
          master: req.body.master,
          doctoral: req.body.doctoral,
          majorInBachelor: req.body.majorInBachelor,
          majorInMaster: req.body.majorInMaster,
          majorInDoctoral: req.body.majorInDoctoral,
          majorInHighSchool: req.body.majorInHighSchool
        };
        console.log(userProfile)
        kafkaProducer.send(kafkaMethods.INITPROFILE, userProfile);
        return res.status(201).json({ user });
      } catch (error) {
        return res.status(500).json({ error });
      }
    })
  })
};

exports.signin = (req, res) => {
  passport.authenticate(
    'local',
    { session: false },
    (error, user) => {
      if (error || !user) {
        return res.status(500).json({ error });
      }
      const payload = {
        'userId': user.id,
        'username': user.username,
        'userType': user.userType,
        'expires': Date.now() + parseInt(JWT_EXPIRATION_MS)
      };
      req.login(payload, {session: false}, (error) => {
        if (error) {
          return res.status(500).json({ error });
        }
        const token = jwt.sign(JSON.stringify(payload), SECRET);
        // res.cookie('jwt', token, { httpOnly: true, secure: true });
        return res.status(200).json({ payload, token });
      });
    }
  )(req, res);
};

exports.validate = () => {
  return [
    check('firstname').exists({ checkFalsy: true }),
    check('lastname').exists({ checkFalsy: true }),
    check('email').isEmail({ checkFalsy: true }),
    check('phoneNumber').exists({ checkFalsy: true })
  ]
}