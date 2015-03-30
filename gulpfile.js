var gulp = require('gulp');
var sync = require('browser-sync');
var reload = sync.reload;
var wiredep = require('wiredep').stream;
var useref = require ('gulp-useref');
var uglify = require ('gulp-uglify');
var styledocco = require ('gulp-styledocco')


gulp.task('styledocco', function (){
	gulp.src('app/css/*.css')
		.pipe(styledocco({
			out: 'docs',
			name: 'Decker Library',
			'no-minify': true,
		}))
})

//setup server
gulp.task('sync', function () {
	sync({
		server: {
			baseDir: ['./app'],
			directory: true,
			index: 'index.html',
			routes: {
			"/bower_components": "bower_components",
			"/docs": "docs"
			}
		}
	});	
});




//watch files
gulp.task('watch', ['sync', 'styledocco'], function () {
	gulp.watch('app/*.html', reload);
	gulp.watch('docs/*.html', reload);
	gulp.watch('bower.json', ['wiredep']);
	gulp.watch('app/css/*.css', ['styledocco']);
});


//watch bower
gulp.task('wiredep', function () {
	gulp.src('app/*.html')
		.pipe(wiredep({
			directory: 'bower_components',
			ignorePath: '../'
		}))
		.pipe(gulp.dest('app'));
});