'use strict';

describe('Auth controller test', function() {
    beforeEach(module('App'));
    beforeEach(module('User'));

    describe('login', function() {
        var scope, controller;
        var AuthMock = jasmine.createSpyObj('AuthService', ['login']);

        beforeEach(inject(function($rootScope, $q, $controller) {
            scope = $rootScope.$new();

            AuthMock.login.and.returnValue($q.when('success'));
            controller = $controller('authController@login as login', { '$scope': scope, 'AuthService': AuthMock });
        }));

        it('should have empty user', function() {
            expect(scope.login.user).toEqual({});
        });

        it('should have empty errors', function() {
            expect(scope.login.errors).toEqual({});
        });

        it('should have submit action', function() {
            expect(scope.login.submit).toBeDefined();
        });

        it('should login', function() {
            scope.login.user = { email: 'test', password: 'test' };
            scope.login.submit({ $valid: true });

            expect(AuthMock.login).toHaveBeenCalled();
        });
    });

    describe('signup', function() {
        var scope, controller;
        var AuthMock = jasmine.createSpyObj('AuthService', ['signup']);

        beforeEach(inject(function($rootScope, $q, $controller) {
            scope = $rootScope.$new();

            AuthMock.signup.and.returnValue($q.when('success'));
            controller = $controller('authController@signup as signup', { '$scope': scope, 'AuthService': AuthMock });
        }));

        it('should have empty user', function() {
            expect(scope.signup.user).toEqual({});
        });

        it('should have empty errors', function() {
            expect(scope.signup.errors).toEqual({});
        });

        it('should have submit action', function() {
            expect(scope.signup.submit).toBeDefined();
        });

        it('should signup', function() {
            scope.signup.user = { email: 'test', password: 'test' };
            scope.signup.submit({ $valid: true });

            expect(AuthMock.signup).toHaveBeenCalled();
        });
    });
});