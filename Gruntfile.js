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
                        'app/bower_components/jquery/jquery.js',
                        'app/bower_components/angular/angular.js',
                        'app/bower_components/angular-bootstrap/ui-bootstrap.js',
                        'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                        'app/bower_components/angular-cookies/angular-cookies.js',
                        'app/bower_components/angular-resource/angular-resource.js',
                        'app/bower_components/angular-ui-router/release/angular-ui-router.js',

                        // app
                        'app/js/src/app.js',
                        'app/js/src/**/*.module.js',
                        'app/js/src/**/*.js'
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
        grunt.task.run(['jshint', 'jscs', 'clean-public', 'copy', 'uglify', 'compass', 'express:dev', 'watch']);
    });

    grunt.registerTask('default', ['jshint', 'jscs', 'clean-public', 'copy', 'uglify', 'compass']);
};
