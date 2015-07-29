/**
 * Auth Service
 */
(function() {
    'use strict';

    function AuthService($http, $q, $cookieStore) {
        var Auth = {};
        var currentUser;

        /**
         * User Login
         * @param  {Object} data
         * @return {Object}
         */
        Auth.login = function login(data) {
            return $http.post('/api/auth/login', data)
                        .then(function success(response) {
                            $cookieStore.put('token', response.data.token);

                            currentUser = response.data.user;
                        });
        };

        Auth.logout = function logout() {
            // return $http.get('/api/auth/logout')
        };

        /**
         * User Singup
         * @param  {Object} data
         * @return {Object}
         */
        Auth.signup = function signup(data) {
            return $http.post('/api/auth/signup', data)
                        .then(function success(response) {
                            $cookieStore.put('token', response.data.token);

                            currentUser = response.data.user;
                        });
        };

        /**
         * Get Current User
         * @return {Object}
         */
        Auth.getCurrentUser = function getCurrentUser() {
            var user = $q.defer();

            if (!currentUser) {
                $http.get('/api/user/me')
                     .then(function success(response) {
                        currentUser = response.data;

                        user.resolve(response.data);
                     });
            } else {
                user.resolve(currentUser);
            }

            return user.promise;
        };

        /**
         * Is Current User Loggedin
         * @return {Boolean}
         */
        Auth.isLoggedIn = function isLoggedIn() {
            return (currentUser);
        };

        /**
         * Is User an Admin
         * @return {Boolean}
         */
        Auth.isAdmin = function isAdmin() {
            return currentUser === 'admin';
        };

        /**
         * Get Token
         * @return {String}
         */
        Auth.getToken = function getToken() {
            return $cookieStore.get('token');
        };

        return Auth;
    }

    angular
        .module('User')
        .factory('AuthService', [
            '$http', '$q', '$cookieStore',
            AuthService
        ]);
})();
