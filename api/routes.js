"use strict";

var path = require('path');

module.exports = function(app) {
    app.use('/api/auth', require('user/routes/auth'));
    app.use('/api/user', require('user/routes/user'));

    app.get('/*', function (req, res){
		res.sendFile(path.join(__dirname, '../public', 'views/index.html'));
    });
};
