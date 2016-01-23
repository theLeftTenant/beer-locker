var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');

//	---------Tasks---------

//	---Default---
gulp.task('default', ['watch']);

//	---JsHint---
gulp.task('jshint', function() {
	return gulp.src('public/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

// ---Watch---
gulp.task('watch', function() {
	gulp.watch('public/**/*.js', ['jshint']);
});	// Configure the files to watch.

//	---Serve---
gulp.task('serve', function() {
	connect.server({
		livereload: false	//default
	});
});