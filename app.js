var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

var app = express();

// database connection
mongoose.connect("mongodb://0.0.0.0:27017/employee-system").then(()=>{
    console.log("Database connected...");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);


module.exports = app;
