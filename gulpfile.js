
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');

gulp.task('sass', function (){
    return gulp.src("static/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("static/css"))
    .pipe(browserSync.stream());
});

gulp.task('watch', function (){
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });

    gulp.watch('static/scss/*.scss', ['sass']);
    gulp.watch(['index.html', 'static/js/site.js'], browserSync.reload);
});

gulp.task('default', ['watch']);