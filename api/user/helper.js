"use strict";

var jwt = require('jsonwebtoken');
var config = require('config');
var Auth = {};

/**
 * Sign Token
 * @param  {String} id
 */
Auth.signToken = function(user) {
    return jwt.sign(user, config.secrets.session, { expiresInMinutes: 60*5 });
};

/**
 * Authenticate
 */
Auth.isAuthenticated = function(req, res, next) {
    var token = req.headers['authorization'];

    if (token) {
        jwt.verify(token.split(' ')[1], config.secrets.session, function(err, user) {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: 'Failed to authenticate token.'
                });
            } else {
                if (!user) {
                    return res.send(401).json({
                        message: 'User not found, invalid token.'
                    });
                }

                req.user = user;

                next();
            }
        });
    } else {
        return res.status(403).json({
            message: 'No token provided.'
        });
    }
};

module.exports = Auth;