// jwt -json web token strategy defined
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require(__base + 'models/User');

//we need to specify a secret word. It is in the .env file
const SECRET = process.env.SECRET

const jwtOptions = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
}

//define a jwtstrategy
const strategy = new JwtStrategy( jwtOptions, (jwt_payload, done) => {

  User.findById( jwt_payload.id )
    .then(user => {
      if (user) done(null, user);
      else done(null, false);
    })
    .catch(err => done(err, false) )
})

module.exports = strategy
