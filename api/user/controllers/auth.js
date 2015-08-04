"use strict";

var passport = require('passport');
var User = require('user/module');
var Auth = require('user/helper');
var Controllers = {};

/**
 * Login
 */
Controllers.login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.status(404).json({
                message: err.message
            });
        }

        var token = Auth.signToken(user);

        res.status(200).json({
            token: token,
            user: user
        });
    })(req, res, next);
};

/**
 * Logout
 */
Controllers.logout = function(req, res, next) {

};

/**
 * Signup
 */
Controllers.signup = function(req, res, next) {
    var _user = new User(req.body);
        _user.provider = 'local';

    _user.save(function(err, user) {
        if (err) return next(err);

        if (!user) {
            return res.status(404).json({
                message: 'User does not exist.'
            });
        }

        var token = Auth.signToken(user);
            
        res.status(200).json({
            token: token,
            user: user
        });
    });
};

module.exports = Controllers;