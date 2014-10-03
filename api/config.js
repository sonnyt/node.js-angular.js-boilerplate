'use strict';

module.exports = {
    // List of user roles
    userRoles: ['guest', 'user', 'admin'],

    secrets: {
        session: 'sites-secret'
    },

    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            }
        },
        uri: 'mongodb://userinteractive:orange@kahana.mongohq.com:10069/userinteractive'
    }
};