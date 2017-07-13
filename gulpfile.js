var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var maps = require('gulp-sourcemaps');

gulp.task('connect', function(){
    connect.server({
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src('./*.html')
        .pipe( connect.reload() )
});

gulp.task('js', function() {
    gulp.src('./js/script.js')
        .pipe( connect.reload() )
});

gulp.task('watch',function(){
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./*.html', ['html']);
});

gulp.task('sass', function( cb ) {
    return gulp.src('./sass/style.scss')
        .pipe( maps.init() )
        .pipe( sass({ expended: true }).on( 'error', sass.logError ) )
        .pipe( maps.write('./') )
        .pipe( gulp.dest('./css') )
        .pipe( connect.reload() )
});

gulp.task('default', ['connect', 'watch']);