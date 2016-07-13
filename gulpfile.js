//all plugins requiered
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var cleanCSS = require('gulp-clean-css');

//------------------------------------------------------------------------------
// Tasks for Development
// sass processing
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// watch project files and reload
gulp.task('watch', function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})

// live reload dev environment
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

//------------------------------------------------------------------------------
// Tasks for Production Build
// minify CSS files
gulp.task('minify-css', function() {
  return gulp.src('app/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('../dist/css'));
});

// js and css concatenation and minification
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('app/*.js', uglify()))
    .pipe(gulp.dest('.'))
});

// clean production envirnomnet
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

// cache clear task
gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback)
});

// default task for development environment
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})

// build task for production environment
gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['sass', 'minify-css', 'useref'],
    callback
  )
});
