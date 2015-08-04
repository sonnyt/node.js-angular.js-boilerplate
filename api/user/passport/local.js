"use strict";

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('user/module');

module.exports = function() {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            User.findOne({
                email: email.toLowerCase()
            }, function(err, user) {
                if (err) return done(err);

                if (!user) {
                    return done({
                        message: 'This email is not registered.'
                    }, false);
                }

                if (!user.authenticate(password)) {
                    return done({
                        message: 'This password is not correct.'
                    }, false);
                }
                
                return done(null, user);
            });
        }
    ));
};