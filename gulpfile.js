"use strict"

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');


gulp.task('sass', function() {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./lib/styles/'));
});

gulp.task('js', function() {
  gulp.src('./src/js/vendor/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./lib/js/vendor'));
  gulp.src('./src/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./lib/js'));
});


gulp.task('watch', function() {
  gulp.watch('./src/styles/**/*.scss', ['sass']);
  gulp.watch('./src/js/*.js', ['js']);
});

gulp.task('default', ['watch', 'sass', 'js']);
