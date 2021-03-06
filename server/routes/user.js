const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const passport = require('passport');
const secretOrKey = 'supersecretkey';

router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({email: 'Email already exists'});
        }
        else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(err => console.log(err));
                })
            })
        }
    })
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user => {
        if (!user) return res.status(404).json({email: 'Email not found'});
        
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = { id: user._id, username: user.username}
                
                jwt.sign(payload, secretOrKey, { expiresIn: 1200 }, (error, token) => {
                    res.json({
                        token: 'Bearer ' + token
                    })
                });
            }
            else {
                return res.status(400).json({password: 'Incorrect Password'});
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        username: req.user.username,
        email: req.user.email
    });
})

module.exports = router;