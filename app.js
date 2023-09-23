var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/Authentication.Routes');
var projectRouter = require('./routes/Project.Routes');
var taskRouter = require('./routes/Task.Routes');
var userRouter = require('./routes/User.Routes');

// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

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
app.use('/project',projectRouter);
app.use('/task',taskRouter);
app.use('/user',userRouter);

// swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
