/**
 * User Service
 */
(function( app ) {
    'use strict';

    app.module( 'User' )

    .factory( 'User', [ '$resource', function( $resource ) {
        return $resource( '/api/users/:id/:controller', {
                id: '@_id'
            }, {
            changePassword: {
                method: 'PUT',
                params: {
                    controller: 'password'
                }
            },
            get: {
                method: 'GET',
                params: {
                    id: 'me'
                }
            }
        });
    } ]);

})( angular );