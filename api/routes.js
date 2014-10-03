'use strict';

module.exports = function( app ) {
    app.use( '/api/users', require( './user/user.routes' ) );

    app.get( '/*', function ( req, res ){
        res.sendfile( './public/app/views/index.html' );
    });
};