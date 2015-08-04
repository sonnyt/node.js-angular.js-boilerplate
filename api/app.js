"use strict";

require('app-module-path').addPath(__dirname);

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var bodyParser = require('body-parser');
var passport = require('passport');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
mongoose.connect(config.mongo.uri, config.mongo.options);

require('user/passport/local')();
require('routes')(app);

app.listen(config.port, function() {
    console.log('Server listening on port ' + config.port);
});