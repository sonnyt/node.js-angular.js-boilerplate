"use strict";

var User = require('user/module');
var Controllers = {};

/**
 * Me
 */
Controllers.me = function(req, res, next) {
    var id = req.user._id;

    User.findOne({
        _id: id
    }, function(err, user) {
        if (err) return next(err);
        
        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }
        
        res.status(200).json(user);
    });
};

module.exports = Controllers;