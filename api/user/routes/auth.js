"use strict";

var express = require('express');
var controller = require('user/controllers/auth');

var router = express.Router();

router.post('/login', controller.login);
router.get('/logout', controller.logout);
router.post('/signup', controller.signup);

module.exports = router;