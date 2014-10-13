/**
 * User Controller
 */
(function(app) {
    'use strict';

    app.module('User')

    /**
     * Login
     */
    .controller('authController@login', [
        '$scope', 'Auth', '$state',
        function($scope, Auth, $state) {
            $scope.user = {};
            $scope.errors = {};

            $scope.login = function(form) {
                $scope.submitted = true;

                if (form.$valid) {
                    Auth.login({
                        email: $scope.user.email,
                        password: $scope.user.password
                    })
                    .then(function() {
                        $state.go('actions.list');
                    })
                    .catch(function(err) {
                        $scope.errors.other = err.message;
                    });
                }
            };
        }
    ])

    /**
     * Sign Up
     */
    .controller('authController@signup', [
        '$scope', 'Auth', '$state',
        function($scope, Auth, $state) {
            $scope.user = {};
            $scope.errors = {};

            $scope.signup = function(form) {
                $scope.submitted = true;

                if (form.$valid) {
                    Auth.signup({
                        name: $scope.user.name,
                        email: $scope.user.email,
                        password: $scope.user.password
                    })
                    .then(function() {
                        $state.go('actions.list');
                    })
                    .catch(function(err) {
                        $scope.errors.other = err.message;
                    });
                }
            };
        }
    ]);

})(angular);
