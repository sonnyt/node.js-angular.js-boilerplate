(function( app ) {
    'use strict';

    angular.module( 'App' )

    .config(function( $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider ) {
        $urlRouterProvider.otherwise( '/' );
        $locationProvider.html5Mode( true );
    });
})( angular );
