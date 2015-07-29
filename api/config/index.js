"use strict";

var node_env = process.env.NODE_ENV || 'development';
var config;

if (node_env === 'development') {
	config = require('./development');
} else {
	config = require('./production');
}

module.exports = config;