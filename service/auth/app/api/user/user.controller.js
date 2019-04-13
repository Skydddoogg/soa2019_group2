const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('./user.model');
const Controller = {};

const SECRET = process.env.SECRET_KEY;
const JWT_EXPIRATION_MS = 1800*1000; // 30 Minutes

Controller.signup = (req, res) => {
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (error, salt) => {
    bcrypt.hash(req.body.password, salt, async (error, hashedPassword) => {
      if (error) {
        return res.status(500).json({ error });
      }
      const userObj = new User({
        username: req.body.username,
        hashedPassword: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        userType: req.body.userType
      });
      try {
        const user = await userObj.save();
        return res.status(201).json( user );
      } catch (error) {
        return res.status(500).json( error );
      }
    })
  })
};

Controller.signin = (req, res) => {
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

module.exports = Controller;