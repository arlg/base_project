'use strict';

/**
  Import plugins
**/
import gulp from 'gulp';
import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import jshint from 'gulp-jshint';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import spritesmith from 'gulp.spritesmith';
import babel from "gulp-babel";
import browserSync from 'browser-sync';


/**
  SETTINGS
**/
const DIR = {
  DEST : '../www/assets',
  SRC_STYLES : 'src/styles',
  SRC_SCRIPTS : 'src/scripts'
};

/**
  TASKS
  - styles
  - scripts-app
  - scripts-plugins
  - jshint
  - styles-prod
  - scripts-app-prod
  - scripts-plugins-prod
  - sprite
  - prod [ styles-prod, scripts-plugins-prod, scripts-app-prod ]
  - gulp ( gulp serve ) : Dev server watch
**/

/**
*   DEV
*   Compiles styles
*   Includes sourcemaps
**/
gulp.task('styles', () => {
  return gulp.src( `${ DIR.SRC_STYLES }/main.scss` )
  .pipe(sourcemaps.init())
  .pipe( postcss( [autoprefixer("last 2 versions")] ) )
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest( `${DIR.DEST}/css` ))
  .pipe(browserSync.stream());
});


/**
*   DEV
*   Compiles scripts
*   Babel
*   Sourcemaps
**/
gulp.task('scripts-app', () => {
  return gulp.src( `${ DIR.SRC_SCRIPTS }/app/**/*.js` )
    .pipe(sourcemaps.init())
    .pipe(babel())
    .on('error', function(e) {
      console.log('>>> ERROR', e);
      // emit here
      this.emit('end');
    })
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest( `${ DIR.DEST }/js/app` ) )
    .pipe(browserSync.stream());

});

/**
*   DEV
*   Compiles scripts plugin directory
*   Concats them all
**/
gulp.task('scripts-plugins', () => {
  return gulp.src(
    [ `${ DIR.SRC_SCRIPTS }/plugins/**/*.js` ]
    )
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest( `${ DIR.DEST }/js/plugins`))
    .pipe(browserSync.stream());
});


/**
*   BEFORE Prod
*   JSHINT scripts
**/
gulp.task('jshint', () => {
  return gulp.src(`${ DIR.SRC_SCRIPTS }/app/**/*.js`)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
});


/**
*   PROD
*   Compiles and minify styles
**/
gulp.task('styles-prod', () => {
    return gulp.src( `${ DIR.SRC_STYLES }/main.scss` )
    .pipe( postcss( [autoprefixer("last 2 versions")] ) )
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest( `${DIR.DEST}/css` ));
});


/**
*   PROD
*   Compiles and minify scripts
**/
gulp.task('scripts-app-prod', () => {
  return gulp.src( `${ DIR.SRC_SCRIPTS }/app/**/*.js` )
    .pipe(concat('main.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest( `${ DIR.DEST }/js/app` ));
});

/**
*   PROD
*   Compiles and minify plugin directory
**/
gulp.task('scripts-plugins-prod', () => {
  return gulp.src(
    [
      `${ DIR.SRC_SCRIPTS }/plugins/**/*.js`
    ]
    )
    .pipe(concat('plugins.js'))
    .pipe(uglify())
    .pipe(gulp.dest( `${ DIR.DEST }/js/plugins` ));
});


/**
*   Creates a sprite from PNG directory
*   ** Needs configuration depending project
*   Also creates retina sprite
**/
gulp.task('sprite', () => {

  var spriteData = gulp.src( `${DIR.DEST}/img/sprites/*.png` ).pipe(spritesmith({
    retinaSrcFilter: ['src/sprite/*@2x.png'],
    imgName: 'sprite.png',
    retinaImgName: 'sprite@2x.png',
    imgPath: '../img/sprite.png',
    retinaImgPath: '../img/sprite@2x.png',
    cssName: '_sprite.sass'
  }));

  spriteData.img.pipe(gulp.dest( `${DIR.DEST}+'/img` ));
  spriteData.css.pipe(gulp.dest( `${ DIR.SRC_STYLES }/` ));

});



/*******************
    MULTIPLE TASKS
********************/

/**
*  Browsersync server with watch
*  Watch => Compile Styles + scripts
**/
gulp.task('serve', ['styles', 'scripts-app', 'scripts-plugins'], function() {
    browserSync.init({
        proxy: "bp.lpg"
    });

    gulp.watch( `${ DIR.SRC_STYLES }/**/*.scss`, ['styles']);
    gulp.watch( `${ DIR.SRC_SCRIPTS }/plugins/**/*.js`, ['scripts-plugins']);
    gulp.watch( `${ DIR.SRC_SCRIPTS }/app/**/*.js`, ['scripts-app']);
    gulp.watch('../www/*.html').on('change', browserSync.reload);

});


/**
*  Compiles and minify/uglify scripts + style
**/
gulp.task('prod', ['styles-prod', 'scripts-plugins-prod', 'scripts-app-prod' ]);

gulp.task('default', ['serve']);