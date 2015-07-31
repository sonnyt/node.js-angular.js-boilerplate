'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var watch = require('gulp-watch');
var del = require('del');

var paths = {
    scripts: {
        src: [
            './app/js/app.js',
            './app/js/**/module.js',
            './app/js/**/*.js'
        ],
        libs: [
            './bower_components/angular/angular.js',
            './bower_components/angular-cookies/angular-cookies.js',
            './bower_components/angular-resource/angular-resource.js',
            './bower_components/ui-router/release/angular-ui-router.js'
        ]
    },
    styles: [
        './app/scss/**/*.scss'
    ],
    images: [
        './app/img/**/*.{png,jpg,gif}'
    ],
    views: [
        './app/views/**/*.html'
    ],
    fonts: [
        './bower_components/font-awesome/fonts/**/*',
        './bower_components/bootstrap-sass/assets/fonts/bootstrap/**/*'
    ]
};

gulp.task('clean', function(cb) {
    del(['./public'], cb);
});

gulp.task('lint', function() {
    return gulp.src(paths.scripts.src)
               .pipe(jshint())
               .pipe(jscs({
                    preset: 'airbnb',
                    validateIndentation: 4
                }))
               .pipe(jshint.reporter('default'));
});

gulp.task('javascript', function() {
    var scripts = [].concat(paths.scripts.libs, paths.scripts.src);

    return gulp.src(scripts)
            .pipe(concat('app.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./public/js'));
});

gulp.task('sass', function() {
    return gulp.src(paths.styles)
            .pipe(sass())
            .pipe(gulp.dest('./public/css'));
});

gulp.task('images', function() {
    return gulp.src(paths.images)
            .pipe(gulp.dest('./public/img'));
});

gulp.task('fonts', function() {
    return gulp.src(paths.fonts)
            .pipe(gulp.dest('./public/fonts'));
});

gulp.task('views', function() {
    return gulp.src(paths.views)
            .pipe(gulp.dest('./public/views'));
});

gulp.task('watch', function() {
    var scripts = [].concat(paths.scripts.libs, paths.scripts.src);

    watch(paths.scripts, function() {
        gulp.start('javascript');
    });

    watch(paths.styles, function() {
        gulp.start('sass');
    });

    watch(paths.images, function() {
        gulp.start('images');
    });

    watch(paths.views, function() {
        gulp.start('views');
    });

    watch(paths.fonts, function() {
        gulp.start('fonts');
    });
});

gulp.task('compile', ['javascript', 'sass', 'images', 'fonts', 'views']);

gulp.task('default', ['clean'], function() {
    gulp.start('compile');
});