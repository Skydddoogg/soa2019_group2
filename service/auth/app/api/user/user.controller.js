const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('./user.model');
const Controller = {};

const SECRET = 'SECRET1234'
const JWT_EXPIRATION_MS = 1800*1000;

Controller.signup = (req, res) => {
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
      if (err) {
        return res.status(400).json({ err: err });
      }
      const user = new User({
        username: req.body.username,
        hashedPassword: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        userType: req.body.userType
      });
      console.log(user);
      user.save()
      .then( user => {
        return res.status(201).json(user);
      })
      .catch( err => {
        return res.status(400).json(err);
      });
    })
  })
};

Controller.signin = (req, res) => {
  passport.authenticate(
    'local',
    { session: false },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({ err });
      }
      const payload = {
        'username': user.username,
        'expires': Date.now() + parseInt(JWT_EXPIRATION_MS),
      };
      req.login(payload, {session: false}, (err) => {
        if (err) {
          return res.status(400).json({ err });
        }
        const token = jwt.sign(JSON.stringify(payload), SECRET);
        // res.cookie('jwt', token, { httpOnly: true, secure: true });
        return res.status(200).json({ payload, token });
      });
    }
  )(req, res);
};

Controller.protectedPage = (req, res) => {
  const { user } = req;
  res.status(200).send({ user });
};

module.exports = Controller;