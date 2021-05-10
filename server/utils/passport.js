const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const validator = require('validator');
const bcrypt = require('bcrypt');

const User = require('../utils/user');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local.register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    if (!validator.isEmail(String(email)) || !validator.isLength(String(password), 5, 15)) return done(null, false, {message: 'Invalid email or password for registration'});

    User.findOne({'email': email}, (err, user) => {
        if (err) return done(err);
        if (user) return done(null, false, {message: 'Email has been taken!'});

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;
                password = hash;

                const newUser = new User({
                    email: email,
                    password: password
                });
                
                newUser.save((err, result) => {
                    if (err) {
                        return done(err);
                    }
                    return done(null, newUser);
                })
            })
        });
    });        
}));

passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    if (!validator.isEmail(String(email)) || !validator.isLength(String(password), 5, 15)) return done(null, false, {message: 'Invalid email or password'});

    User.findOne({email: email}, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'No user found.'});
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                return done(null, user);
            }
            else return done(null, false, {message: 'Incorrect password.'});
        });
    });
}));