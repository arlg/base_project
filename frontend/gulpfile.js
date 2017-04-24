/*
    Loads the plugins
*/
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    spritesmith = require('gulp.spritesmith'),
    babel = require("gulp-babel");

/***********
    VARS
************/
var DEST = '../www/assets';
var SOURCE_STYLES = 'src/styles';
var SOURCE_SCRIPTS = 'src/scripts';

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

    return gulp.src(SOURCE_STYLES+'/main.scss')
    .pipe(sourcemaps.init())
    .pipe( postcss( [autoprefixer("last 2 versions")] ) )
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST+'/css'))
    .pipe(livereload());
});


/**
*   Compiles scripts
**/
gulp.task('scripts-app', function() {
  return gulp.src(SOURCE_SCRIPTS+'/app/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST+'/js/app'))
    .pipe(livereload());
});


/**
*   JSHINT scripts
**/
gulp.task('scripts-jshint', function() {
  return gulp.src(SOURCE_SCRIPTS+'/app/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    // .pipe(concat('main.js'))
    // .pipe(gulp.dest(DEST+'/js/app')) // No need to write
});


/**
*   Compiles plugin directory
**/
gulp.task('scripts-plugins', function() {
  return gulp.src(
    [ SOURCE_SCRIPTS+'/plugins/**/*.js' ]
    )
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest(DEST+'/js/plugins'));
});


/****
 PROD
****/

/**
*   Compiles and minify styles
**/
gulp.task('styles-prod', function() {
    return gulp.src(SOURCE_STYLES+'/main.scss')
    .pipe( postcss( [autoprefixer("last 2 versions")] ) )
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest(DEST+'/css'))
});


/**
*   Compiles and minify scripts
**/
gulp.task('scripts-app-prod', function() {
  return gulp.src(SOURCE_SCRIPTS+'/app/**/*.js')
    .pipe(concat('main.js'))
    .pipe(babel())
    .pipe(gulp.dest(DEST+'/js/app'))
    // .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(DEST+'/js/app'));
});

/**
*   Compiles and minify plugin directory
**/
gulp.task('scripts-plugins-prod', function() {
  return gulp.src(
    [
      SOURCE_SCRIPTS+'/plugins/**/*.js'
    ]
    )
    .pipe(concat('plugins.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(DEST+'/js/plugins'));
});


/**
*   Creates a sprite from PNG directory
*   ** Needs configuration depending project
**/
gulp.task('sprite', function () {

  var spriteData = gulp.src(DEST+'/img/sprites/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../img/sprite.png',
    cssName: '_sprite.sass'
  }));

  spriteData.img.pipe(gulp.dest(DEST+'/img'));
  spriteData.css.pipe(gulp.dest(SOURCE_STYLES+'/'));

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
  gulp.watch(SOURCE_STYLES+'/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch(SOURCE_SCRIPTS+'/app/**/*.js', ['scripts-app']);


});

/**
*  Compiles and minify scripts + style
**/
gulp.task('prod', ['styles-prod', 'scripts-app-prod', 'scripts-plugins-app-prod']);
