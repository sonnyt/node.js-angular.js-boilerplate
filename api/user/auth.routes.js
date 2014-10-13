'use strict';

var express = require('express'),
    passport = require('passport'),
    config = require('../config'),
    User = require('./user.module');

// Passport Configuration
require('./local/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local'));

module.exports = router;