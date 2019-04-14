require('module-alias/register');

const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('./user.model');
const kafkaProducer = require('@kafka/producer');
const kafkaMethods = {
  INITOFFERINBOX: 'initofferinbox',
  INITPROFILE: 'initprofile'
}

const SECRET = process.env.SECRET_KEY;
const JWT_EXPIRATION_MS = 1800*1000; // 30 Minutes

exports.signup = (req, res) => {
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (error, salt) => {
    bcrypt.hash(req.body.password, salt, async (error, hashedPassword) => {
      if (error) {
        return res.status(500).json({ error });
      }
      const userAuthData = new User({
        username: req.body.username,
        hashedPassword: hashedPassword,
        email: req.body.email,
        userType: req.body.userType
      });
      try {
        const user = await userAuthData.save();
        if (user.userType === 'student') {
          kafkaProducer.send(kafkaMethods.INITOFFERINBOX, user.id);
        }
        // const userProfile = {
        //   id: user.id,
        //   firstname: req.body.firstname,
        //   lastname: req.body.lastname,
        //   email: req.body.email,
        //   phoneNumber: req.body.phoneNumber
        // }
        // kafkaProducer.send(kafkaMethods.INITPROFILE, userProfile);
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
        return res.status(400).json({ error });
      }
      const payload = {
        'username': user.username,
        'expires': Date.now() + parseInt(JWT_EXPIRATION_MS)
      };
      req.login(payload, {session: false}, (error) => {
        if (error) {
          return res.status(400).json({ error });
        }
        const token = jwt.sign(JSON.stringify(payload), SECRET);
        // res.cookie('jwt', token, { httpOnly: true, secure: true });
        return res.status(200).json({ payload, token });
      });
    }
  )(req, res);
};
