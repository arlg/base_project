/*
    Loads the plugins
*/
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    spritesmith = require('gulp.spritesmith');


/*******************
    SINGLE TASKS
********************/

/****
 DEV
****/

/**
*   Compiles styles
**/
gulp.task('styles', function() {
    return sass('src/styles/main.scss', { style: 'expanded', sourcemap: true })
      // .pipe(sourcemaps.init())
      // .pipe( postcss( [autoprefixer("last 2 versions")] )) // No need for dev in Chrome
      .pipe(sourcemaps.write()) // Working sourcemaps and livereload needs to be inline
      .pipe(gulp.dest('www/assets/css'))
      .pipe(livereload());
});


/**
*   Compiles scripts
**/
gulp.task('scripts-app', function() {
  return gulp.src('src/scripts/app/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('www/assets/js/app'))
    .pipe(livereload());
});


/**
*   JSHINT scripts
**/
gulp.task('scripts-jshint', function() {
  return gulp.src('src/scripts/app/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    // .pipe(concat('main.js'))
    // .pipe(gulp.dest('www/assets/js/app')) // No need to write
});


/**
*   Compiles and minify plugin directory
**/
gulp.task('scripts-plugins', function() {
  return gulp.src(
    [
      'src/scripts/plugins/**/*.js'
    ]
    )
    .pipe(concat('plugins.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('www/assets/js/plugins'));
});


/****
 PROD
****/

/**
*   Compiles and minify styles
**/
gulp.task('styles-prod', function() {
  return sass('src/styles/main.scss', { style: 'expanded'})
    .pipe(autoprefixer("last 2 versions"))
    .pipe(gulp.dest('www/assets/css'))
    // .pipe(rename({suffix: '.min'})) // Keep the same file
    .pipe(cssnano())
    .pipe(gulp.dest('www/assets/css'));
});


/**
*   Compiles and minify scripts
**/
gulp.task('scripts-app-prod', function() {
  return gulp.src('src/scripts/app/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('www/assets/js/app'))
    // .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('www/assets/js/app'));
});


/**
*   Creates a sprite from PNG directory
*   ** Needs configuration depending project
**/
gulp.task('sprite', function () {

  var spriteData = gulp.src('www/assets/img/sprites/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../img/sprite.png',
    cssName: '_sprite.sass'
  }));

  spriteData.img.pipe(gulp.dest('www/assets/img'));
  spriteData.css.pipe(gulp.dest('src/styles/'));

});



/*******************
    MULTIPLE TASKS
********************/

/**
*  Watch => Compile Styles + scripts
**/
gulp.task('watch', function() {

  livereload.listen();

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts-app']);


});

/**
*  Compiles and minify scripts + style
**/
gulp.task('prod', ['styles-prod', 'scripts-app-prod']);