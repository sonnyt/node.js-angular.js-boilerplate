'use strict';

var express = require( 'express' ),
    app = express(),
    mongoose = require( 'mongoose' ),
    config = require( './config' ),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    cookieParser = require('cookie-parser');

app.use( express.static( './public' ) );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

mongoose.connect( config.mongo.uri, config.mongo.options );

require( './routes' )( app );

app.listen( 3000, function() {
    console.log( 'Server listening on port 3000' );
});