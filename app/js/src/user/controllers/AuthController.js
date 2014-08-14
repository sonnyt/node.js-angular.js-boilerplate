/**
 * User Controller
 */
(function( app ) {
    'use strict';

    app.module( 'User' )

    /**
     * Verify Email
     */
    .controller( 'authController@login', [ '$scope', '$location', function( $scope ) {
        console.log('test');
    } ]);

})( angular );
