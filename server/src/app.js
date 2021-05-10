const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const mongoStore = require('connect-mongo');

const app = express();
const uri = 'mongodb+srv://bmtran:minhcurry99@clusterio.ijqmn.mongodb.net/users?retryWrites=true&w=majority';

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'supersecretkey', resave: false, saveUninitialized: false, store: mongoStore.create({mongoUrl: uri}), cookie: {maxAge: 180*60*1000}}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
require('../utils/passport');

app.use((req, res, next) => {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

module.exports = app;