'use strict';

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            './bower_components/angular/angular.js',
            './bower_components/angular-mocks/angular-mocks.js',
            './bower_components/angular-cookies/angular-cookies.js',
            './bower_components/angular-resource/angular-resource.js',
            './bower_components/ui-router/release/angular-ui-router.js',

            './app/js/app.js',
            './app/js/**/module.js',
            './app/js/**/*.js'
        ],
        exclude: [],
        preprocessors: {},
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};