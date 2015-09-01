'use strict';

describe('Auth service test', function() {
    var AuthService, $httpBackend, mockData;

    beforeEach(module('App'));
    beforeEach(module('User'));

    beforeEach(inject(function(_AuthService_, _$httpBackend_) {
        AuthService = _AuthService_;
        $httpBackend = _$httpBackend_;
        mockData = {
            token: 'testToken',
            user: {
                name: {
                    first: 'Awesemo',
                    last: '300'
                },
                role: 'admin'
            }
        };
    }));

    it('should login', function() {
        var response,
            loginInfo = {
                email: 'test@test.com',
                password: '12345'
            };

        $httpBackend.whenPOST('/api/auth/login').respond(function(method, url, data) {
            var _data = JSON.parse(data);

            expect(_data.email).toBe(loginInfo.email);
            expect(_data.password).toBe(loginInfo.password);

            response = mockData;

            return [200, 'success', {}];
        });

        AuthService.login(loginInfo).then(function() {
            expect(response).toEqual(mockData);
        });

        $httpBackend.flush();
    });

    it('should signup', function() {
        var response,
            signupInfo = {
                email: 'test@test.com',
                password: '12345'
            };

        $httpBackend.whenPOST('/api/auth/signup').respond(function(method, url, data) {
            var _data = JSON.parse(data);

            expect(_data.email).toBe(signupInfo.email);
            expect(_data.password).toBe(signupInfo.password);

            response = mockData;

            return [200, 'success', {}];
        });

        AuthService.signup(signupInfo).then(function() {
            expect(response).toEqual(mockData);
        });

        $httpBackend.flush();
    });

    it('should get current user', function() {
        $httpBackend.whenGET('/api/user/me').respond(mockData.user);

        AuthService.getCurrentUser().then(function(response) {
            expect(response).toEqual(mockData.user);
        });

        $httpBackend.flush();
    });

    it('should check if user loggedin', function() {
        $httpBackend.whenGET('/api/user/me').respond(mockData.user);

        AuthService.getCurrentUser().then(function() {
            expect(AuthService.isLoggedIn()).toBeTruthy();
        });

        $httpBackend.flush();
    });


    it('should check if current user is an admin', function() {
        $httpBackend.whenGET('/api/user/me').respond(mockData.user);

        AuthService.getCurrentUser().then(function() {
            expect(AuthService.isAdmin()).toBeTruthy();
        });

        $httpBackend.flush();
    });
});