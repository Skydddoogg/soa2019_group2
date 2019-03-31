const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
// const { check, validationResult } = require('express-validator/check');
const User = require('./user.model');
const Controller = {};

const keys = `${global.gConfig.secret_key}`;

Controller.signUp = (req, res) => {

  const password = req.body.password;
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) {
        return res.status(400).json({ error: err });
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

// Controller.signIn = (req, res) => {
//   passport.authenticate('local', { session: false }, (error, user) => {
//     if (error || !user) {
//       res.status(400).json({ error });
//     }
//     const payload = {
//       username: user.username,
//       expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
//     };
//     req.login(payload, {session: false}, (error) => {
//       if (error) {
//         res.status(400).send({ error });
//       }

//       /** generate a signed json web token and return it in the response */
//       const token = jwt.sign(JSON.stringify(payload), keys.secret);

//       /** assign our jwt to the cookie */
//       res.cookie('jwt', jwt, { httpOnly: true, secure: true });
//       res.status(200).send({ username });
//     });
//   },
//   )(req, res);
// };

// Controller.protectedPage = (req, res) => {
//   passport.authenticate('jwt', {session: false}), (req, res) => {
//     const { user } = req;
//     res.status(200).send({ user });
//   }
// };

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