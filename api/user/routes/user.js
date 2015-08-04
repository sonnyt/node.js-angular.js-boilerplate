"use strict";

var express = require('express');
var controller = require('user/controllers/user');
var Auth = require('user/helper');

var router = express.Router();

router.get('/me', Auth.isAuthenticated, controller.me);

module.exports = router;