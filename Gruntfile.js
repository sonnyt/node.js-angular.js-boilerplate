module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        express: {
            options: {
                port: 3000,
                spawn: false
            },
            dev: {
                options: {
                    script: 'api/app.js',
                    debug: true,
                    spawn: false
                }
            }
        },

        jscs: {
            src: 'app/js/src/**/*.js',
            options: {
                preset: "airbnb",
                validateIndentation: 4,
                validateQuoteMarks: true,
                requireCamelCaseOrUpperCaseIdentifiers: 'ignoreProperties',
                maximumLineLength: 600
            }
        },

        jshint: {
            options: {
                globals: {
                    jQuery: true,
                    angular: true
                }
            },
            files: {
                src: ['Gruntfile.js', 'app/js/src/**/*.js']
            }
        },

        copy: {
            bower: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/bower_components/',
                        src: [
                            'angular/angular.js',
                            'angular-cookies/angular-cookies.min.js',
                            'angular-resource/angular-resource.min.js',
                            'angular-ui-router/release/angular-ui-router.min.js',
                            'angular-bootstrap/ui-bootstrap-tpls.min.js'
                        ],
                        dest: 'public/app/javascript/library',
                        filter: 'isFile'
                    },
                    // Bootstrap Fonts
                    {
                        expand: true,
                        cwd: 'app/bower_components/bootstrap-sass/fonts',
                        src: ['**/*'],
                        dest: 'public/app/fonts/bootstrap',
                        filter: 'isFile'
                    },
                    // FontAwesome Fonts
                    {
                        expand: true,
                        cwd: 'app/bower_components/fontawesome/fonts',
                        src: ['**/*'],
                        dest: 'public/app/fonts/fontawesome',
                        filter: 'isFile'
                    }
               ]
            },

            angular: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/js/src/',
                        src: ['**/*', '!**/test/**'],
                        dest: 'public/app/javascript/src',
                        filter: 'isFile'
                    },
                    // Views
                    {
                        expand: true,
                        cwd: 'app/views',
                        src: ['**/*'],
                        dest: 'public/app/views',
                        filter: 'isFile'
                    },
               ]
            }
        },

        uglify: {
            angular: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                    sourceMap: true
                },
                files: {
                    'public/app/javascript/app.min.js': [
                        // libraries
                        'public/app/javascript/library/angular/angular.js',
                        'public/app/javascript/library/angular-cookies/angular-cookies.min.js',
                        'public/app/javascript/library/angular-resource/angular-resource.min.js',
                        'public/app/javascript/library/angular-ui-router/release/angular-ui-router.min.js',
                        'public/app/javascript/library/angular-bootstrap/ui-bootstrap-tpls.min.js',

                        // app
                        'public/app/javascript/src/app.js',
                        'public/app/javascript/src/**/*.module.js',
                        'public/app/javascript/src/**/*.js'
                    ]
                }
            }
        },

        compass: {
            dist: {
                options: {
                    outputStyle: 'compressed',
                    sassDir: ['app/scss'],
                    cssDir: ['public/app/stylesheet']
                }
            }
        },

        watch: {
            js: {
                files: ['app/js/**/*.js'],
                tasks: ['copy:angular', 'uglify']
            },
            css: {
                files: ['app/scss/**/*.scss'],
                tasks: ['compass']
            },
            view: {
                files: ['app/views/**/*.html'],
                tasks: ['copy:angular']
            },
            express: {
                files: ['api/**/*.js'],
                tasks: ['express:dev']
            }
        }
    });

    grunt.registerTask('clean-public', 'Removing Angular Files!', function() {
        grunt.file.delete('public/app');
        grunt.file.delete('app/js/library');
    });

    grunt.registerTask('serve', function (target) {
        grunt.task.run(['jshint', 'jscs', 'clean-public', 'copy', 'uglify', 'compass', 'express:dev', 'watch']);
    });

    grunt.registerTask('default', ['jshint', 'jscs', 'clean-public', 'copy', 'uglify', 'compass']);
};
