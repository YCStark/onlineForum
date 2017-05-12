var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var connect = require('gulp-connect');
var plugins = gulpLoadPlugins();
gulp.task('webServer', function () {
	plugins.connect.server();
});

gulp.task('default', ['webServer']);




