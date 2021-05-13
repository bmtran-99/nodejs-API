const express = require('express');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const user = require('../routes/user');
const passport = require('passport');

const app = express();
const uri = 'mongodb+srv://bmtran:minhcurry99@clusterio.ijqmn.mongodb.net/users?retryWrites=true&w=majority';

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'supersecretkey', resave: false, saveUninitialized: false, store: mongoStore.create({mongoUrl: uri}), cookie: {maxAge: 180*60*1000}}));

app.use(passport.initialize());
require('../utils/passport');

app.use('/api/users', user);

module.exports = app;