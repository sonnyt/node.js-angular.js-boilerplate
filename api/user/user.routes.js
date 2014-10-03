'use strict';

var express = require( 'express' ),
    controller = require( './controllers/user' ),
    auth = require( './services/auth' );

var router = express.Router();

router.get( '/', auth.hasRole( 'admin' ), controller.index );
router.delete( '/:id', auth.hasRole( 'admin' ), controller.destroy );
router.get( '/me', auth.isAuthenticated(), controller.me );
router.put( '/:id/password', auth.isAuthenticated(), controller.changePassword );
router.get( '/:id', auth.isAuthenticated(), controller.show );
router.post( '/', controller.create );

module.exports = router;
