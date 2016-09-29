var gulp        =   require('gulp');
var concat      =   require('gulp-concat');
var uglify      =   require('gulp-uglify');
var image       =   require('gulp-image');

gulp.task('optimImage', function () {
    gulp.src('demo/r6/*')
       .pipe(image())
       .pipe(gulp.dest('demo/r7'));
});

gulp.task('scripts', function() {
    return gulp.src(['izziImageSequence.js', 'bower_components/hammerjs/hammer.min.js', 'bower_components/pixi.js/bin/pixi.min.js', 'bower_components/PreloadJS/lib/preloadjs-0.6.2.min.js', 'magipack/src/Magipack.min.js'])
       .pipe(concat('izziImageSequence-min.js'))
       .pipe(gulp.dest('./'));
});

gulp.task('watch', ['scripts'], function(){
    gulp.watch('izziImageSequence.js', ['scripts']);
});

gulp.task('clean:dist', function() {
    return del.sync('min');
});

gulp.task('build', function (callback) {
    runSequence('clean:dist',
       ['scripts'],
       callback
    )
});