var gulp = require('gulp');
var webServer = require("gulp-webserver");
var gulpLoadPlugins = require('gulp-load-plugins');
var connect = require('gulp-connect');
var plugins = gulpLoadPlugins();

gulp.task('webServer', function () {
	plugins.connect.server();
	gulp.src("../")
		.pipe(webServer({
			open: "http://localhost:8080/index.html",
			port: 80
		}));
});

gulp.task('default', ['webServer'], function() {
	console.log("gulp is doing");
});




