const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
// const { check, validationResult } = require('express-validator/check');
const User = require('./user.model');
const Controller = {};

const secret = 'SECRET1234'

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
        console.log('err from 1');
        return res.status(400).json({ err });
      }
      /** This is what ends up in our JWT */
      const payload = {
        'username': user.username,
        'expires': Date.now() + parseInt(1800*1000),
      };

      /** assigns payload to req.user */
      req.login(payload, {session: false}, (err) => {
        if (err) {
          console.log('err from 2');
          return res.status(400).json({ err });
        }

        /** generate a signed json web token and return it in the response */
        const token = jwt.sign(JSON.stringify(payload), secret);

        /** assign our jwt to the cookie */
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

// Controller.validate = (method) => {
//   switch (method) {
//     case 'signup': {
//       return [
//         check('username', 'username doesn\'t exists').exists({ checkFalsy: true }),
//         check('password', 'hashedPassword doesn\'t exist').isLength({ min: 6 }),
//         check('firstname', 'firstname doesn\'t exists').exists({ checkFalsy: true }),
//         check('lastname', 'lastname doesn\'t exists').exists({ checkFalsy: true }),
//         check('email', 'email is wrong format or doesn\'t exist').isEmail(),
//         check('userType', 'userType is wrong format or doesn\'t exist').isIn(['student', 'tutor'])
//       ]
//     }
//   }
// }

module.exports = Controller;