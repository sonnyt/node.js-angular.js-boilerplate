"use strict";

module.exports = {
	port: 3000,
	debug: true,
    secrets: {
        session: 'sites-secret'
    },
    mongo: {
        options: {
            db: {
                safe: true
            }
        },
        uri: 'mongodb://stylegreed:orange@linus.mongohq.com:10042/FinanceDashboard'
    }
};