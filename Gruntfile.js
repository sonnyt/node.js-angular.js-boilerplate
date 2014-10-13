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
                    // jQuery
                    {
                        src: 'app/bower_components/jquery/jquery.js',
                        dest: 'app/js/library/jquery.js'
                    },
                    // Angular
                    {
                        src: 'app/bower_components/angular/angular.js',
                        dest: 'app/js/library/angular.js'
                    },
                    // Angular Bootstrap UI
                    {
                        src: 'app/bower_components/angular-bootstrap/ui-bootstrap.js',
                        dest: 'app/js/library/ui-bootstrap.js'
                    },
                    // Angular Bootstrap UI Template
                    {
                        src: 'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                        dest: 'app/js/library/ui-bootstrap-tpls.js'
                    },
                    // Angular Cookies
                    {
                        src: 'app/bower_components/angular-cookies/angular-cookies.js',
                        dest: 'app/js/library/angular-cookies.js'
                    },
                    // Angular Resource
                    {
                        src: 'app/bower_components/angular-resource/angular-resource.js',
                        dest: 'app/js/library/angular-resource.js'
                    },
                    // Angular UI Router
                    {
                        src: 'app/bower_components/angular-ui-router/release/angular-ui-router.js',
                        dest: 'app/js/library/angular-ui-router.js'
                    },
                    // Bootstrap Fonts
                    {
                        expand: true,
                        cwd: 'app/bower_components/bootstrap-sass/fonts',
                        src: ['**/*'],
                        dest: 'public/app/fonts',
                        filter: 'isFile'
                    },
                    // FontAwesome Fonts
                    {
                        expand: true,
                        cwd: 'frontend/bower_components/fontawesome/fonts',
                        src: ['**/*'],
                        dest: 'public/cdn-static/dist/app/fonts/fontawesome',
                        filter: 'isFile'
                    },
               ]
            },

            angular: {
                files: [
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

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    // library
                    'app/js/library/jquery.js',
                    'app/js/library/angular.js',
                    'app/js/library/ui-bootstrap.js',
                    'app/js/library/*.js',

                    // app
                    'app/js/src/app.js',
                    'app/js/src/**/*.module.js',
                    'app/js/src/**/*.js'
                ],
                dest: 'public/app/javascript/app.min.js'
            }
        },

        uglify: {
            angular: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                    mangle: false
                },
                files: {
                    'public/app/javascript/app.min.js': ['public/app/javascript/app.min.js']
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
                tasks: ['concat', 'uglify']
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
        grunt.task.run(['jshint', 'jscs', 'clean-public', 'copy', 'concat', 'uglify', 'compass', 'express:dev', 'watch']);
    });

    grunt.registerTask('default', ['jshint', 'jscs', 'clean-public', 'copy', 'concat', 'uglify', 'compass']);
};