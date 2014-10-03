(function( app ) {
    'use strict';

    angular.module( 'User' )

    .config([ '$httpProvider', function( $httpProvider ) {
        $httpProvider.interceptors.push( 'authInterceptor' );
    } ])

    .factory( 'authInterceptor', [ '$rootScope', '$q', '$cookieStore', '$location', function( $rootScope, $q, $cookieStore, $location ) {
        return {
            request: function( config ) {
                var token;

                config.headers = config.headers || {};

                if ( ( token = $cookieStore.get( 'token' ) ) ) {
                    config.headers.Authorization = 'Bearer ' + token;
                }

                return config;
            },

            responseError: function( response ) {
                if ( response.status === 401 ) {
                    $location.path( '/login' );

                    // remove any stale tokens
                    $cookieStore.remove( 'token' );

                    return $q.reject( response );
                } else {
                    return $q.reject( response );
                }
            }
        };
    } ])

    .run( [ '$rootScope', '$location', 'Auth', function( $rootScope, $location, Auth ) {
        $rootScope.$on( '$stateChangeStart', function( event, next ) {
            Auth.isLoggedInAsync(function( loggedIn ) {
                if ( next.authenticate && !loggedIn ) {
                    $location.path( '/login' );
                }
            });
        });
    } ]);
})( angular );
