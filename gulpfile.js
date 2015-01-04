var gulp = require('gulp');
var traceur = require('gulp-traceur');
var jasmine = require('gulp-jasmine');

gulp.task('default', ['compile']);

gulp.task('compile', function() {
  return gulp.src('lib/**/*.js')
    .pipe(traceur())
    .pipe(gulp.dest('build'));
});

gulp.task('test', ['compile'], function() {
  return gulp.src('test/**/*.js')
    .pipe(jasmine());
});
