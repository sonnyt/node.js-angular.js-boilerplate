'use strict';

var path = require('path');

module.exports = function(app) {
    app.use('/api/users', require('./user/user.routes'));

    app.get('/*', function (req, res){
        res.sendFile(path.join(__dirname, '../public', 'app/views/index.html'));
    });
};