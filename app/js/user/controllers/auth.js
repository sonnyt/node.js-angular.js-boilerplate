/**
 * User Controller
 */
(function() {
    'use strict';

    /**
     * Login Controller
     * @param {Object} AuthService
     * @param {Object} $state
     */
    function LoginController(AuthService, $state) {
        this.user = {};
        this.errors = {};

        /**
         * Login Action
         * @param  {Object} form
         */
        this.submit = function login(form) {
            if (form.$valid) {
                AuthService.login({
                        email: this.user.email,
                        password: this.user.password,
                    })
                    .then(function success() {
                        // $state.go('index');
                    }).catch(function error(response) {
                        this.errors = response.data;
                    }.bind(this));
            }
        }.bind(this);
    }

    /**
     * Sign Up Controller
     * @param {Object} AuthService
     * @param {Object} $state
     */
    function SignUpController(AuthService, $state) {
        this.user = {};
        this.errors = {};

        /**
         * Singup Action
         * @param  {Object} form
         */
        this.submit = function singup(form) {
            if (form.$valid) {
                AuthService.signup({
                        name: this.user.name,
                        email: this.user.email,
                        password: this.user.password,
                    })
                    .then(function success() {
                        // $state.go('index');
                    })
                    .catch(function error(response) {
                        this.errors = response.data;
                    }.bind(this));
            }
        }.bind(this);
    }

    angular
        .module('User')
        .controller('authController@login', [
            'AuthService', '$state',
            LoginController,
        ])
        .controller('authController@signup', [
            'AuthService', '$state',
            SignUpController,
        ]);

})();
