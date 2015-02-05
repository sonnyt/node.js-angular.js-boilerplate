'use strict';

var node_env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        userRoles: ['guest', 'user', 'admin'],
        port: 3000,
        secrets: {
            session: 'sites-secret'
        },
        mongo: {
            options: {
                db: {
                    safe: true
                }
            },
            uri: ''
        }
    },
    production: {
        port: 5000,
        userRoles: ['guest', 'user', 'admin'],
        secrets: {
            session: 'sites-secret'
        },
        mongo: {
            options: {
                db: {
                    safe: true
                }
            },
            uri: ''
        }
    }
};

module.exports = config[node_env];