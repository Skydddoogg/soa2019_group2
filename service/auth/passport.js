require('@conf/config')

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const bcrypt = require('bcrypt');

const secret = `${global.gConfig.secret_key}`

const User = require('./app/api/auth/user.model');

passport.use(new LocalStrategy({
  usernameField: username,
  passwordField: password,
}, async (username, password, done) => {
  try {
    const user = await User.findOne({username: username}).exec();
    const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);

    if (passwordsMatch) {
      return done(null, user);
    } else {
      return done('Incorrect Username / Password');
    }
  } catch (error) {
    done(error);
  }
}));

passport.use(new JWTStrategy({
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: secret,
  }, (jwtPayload, done) => {
    if (Date.now() > jwtPayload.expires) {
      return done('jwt expired');
    }
    return done(null, jwtPayload);
  }
));