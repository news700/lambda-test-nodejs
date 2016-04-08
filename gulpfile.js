var gulp = require('gulp');
var zip = require('gulp-zip');

var zipfile = 'lambda-test.zip';

//ZIP 파일을 만든다.
gulp.task('zip', function () {
	return gulp.src([
			'*.js'
		], {dot: true})
		.pipe(zip(zipfile))
		.pipe(gulp.dest('./'));
});
