const express = require('express');
const mongoose = require('mongoose');
const expressHbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const mongoStore = require('connect-mongo');

const routes = require('../routes/index');
const userRoutes = require('../routes/user');

const app = express();
const uri = 'mongodb+srv://bmtran:minhcurry99@clusterio.ijqmn.mongodb.net/users?retryWrites=true&w=majority';

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const publicStaticDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'supersecretkey', resave: false, saveUninitialized: false, store: mongoStore.create({mongoUrl: uri}), cookie: {maxAge: 180*60*1000}}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
require('../utils/passport');
app.use(express.static(publicStaticDirPath));

app.use((req, res, next) => {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

app.use('/user', userRoutes);
app.use('/', routes);

module.exports = app;