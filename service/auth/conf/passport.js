require('@conf/config')

const bcrypt = require('bcrypt');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const User = require('../app/api/auth/user.model');

const secret = 'SECRET1234'

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

  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
    }, (jwtPayload, done) => {
      if (Date.now() > jwtPayload.expires) {
        return done('jwt expired');
      }
      return done(null, jwtPayload);
    })
  );

};