const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const secretOrKey = require('../routes/user').secretOrKey;

var options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        User.findOne({id :jwt_payload.id}, (err, user) => {
            if (err) {
                return done(err, user);
            }

            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    }));
}