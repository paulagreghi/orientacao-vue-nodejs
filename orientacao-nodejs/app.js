var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bd')
.then(db => console.log('db connected'))
.catch(err => console.log(err));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var orientacaoRouter = require('./routes/orientacao');
var professorRouter = require('./routes/professor');

var app = express();
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    httpOnly: false,
    secure: false,
    secret: 'super secret session key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 10000000 }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orientacao', orientacaoRouter);
app.use('/professor', professorRouter);


module.exports = app;
