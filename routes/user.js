const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('user/profile');
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/register', (req, res) => {
    var messages = req.flash('error');
    res.render('user/register', {messages: messages, hasErrors: messages.length > 0});
});

router.post('/register', passport.authenticate('local.register', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/register',
    failureFlash: true
}));

router.get('/login', (req, res) => {
    var messages = req.flash('error');
    res.render('user/login', {messages: messages, hasErrors: messages.length > 0});
});

router.post('/login', passport.authenticate('local.login', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/login',
    failureFlash: true
}));

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}