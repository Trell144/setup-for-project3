
//IMPORTING DEPENDENCIES
require("dotenv").config();
var express = require('express');
var path = require('path');
var logger = require('morgan');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }); //mongodb://localhost/idea-board

const connection = mongoose.connection;
connection.on('connected', () => {
    console.log('Mongoose Connected Successfully');
});
// If the connection throws an error
connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/client/build/'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//ROUTES
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html')
})

module.exports = app;