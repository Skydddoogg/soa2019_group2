const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const SECRET = 'SECRET1234'

module.exports = function(passport) {
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
    }, (jwtPayload, done) => {
      if (Date.now() > jwtPayload.expires) {
        return done('jwt expired');
      }
      return done(null, jwtPayload);
    })
  );
};