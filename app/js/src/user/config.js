(function( app ) {
    'use strict';

    angular.module( 'User' )

    .config(function( $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider ) {
        $httpProvider.interceptors.push(function( $rootScope, $q, $cookieStore, $state ) {
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
                        $state.path( 'user-login' );

                        // remove any stale tokens
                        $cookieStore.remove( 'token' );

                        return $q.reject( response );
                    } else {
                        return $q.reject( response );
                    }
                }
            };
        });
    });
})( angular );
