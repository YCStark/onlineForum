var gulp = require('gulp');
var webServer = require("gulp-webserver");
var gulpLoadPlugins = require('gulp-load-plugins');
var connect = require('gulp-connect');
var webpack = require('webpack-stream');
var webpackConfig = require("./webpack.config.js");
var plugins = gulpLoadPlugins();

gulp.task("handelJS", function(callback) {
    return gulp.src('src/*.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist/'))
});

gulp.task('webServer', function() {
    plugins.connect.server();
    gulp.src("../")
        .pipe(webServer({
            open: "http://localhost:8080/src/index.html",
            port: 80,
            livereload: true
        }));
});

gulp.watch(['src/*.js'], ['handelJS'])

gulp.task('default', ['webServer', 'handelJS'], function() {
    console.log("gulp is doing");
});
