const bcrypt = require('bcrypt');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = require('passport-local').Strategy;

const User = require('../app/api/user/user.model');

module.exports = function(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    }, async (username, password, done) => {
      try {
        const userDocument = await User.findOne({username: username}).exec();
        const passwordsMatch = await bcrypt.compare(password, userDocument.hashedPassword);
        if (passwordsMatch) {
          return done(null, userDocument);
        } else {
          return done('Invalid username or password');
        }
      } catch (err) {
        done('Invalid username or password');
      }
    })
  );
};