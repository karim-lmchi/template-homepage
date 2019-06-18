const gulp = require('gulp');
const browserSync = require('browser-sync');
const twig = require('gulp-twig');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglifyjs = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const pipeline = require('readable-stream').pipeline;


/* 
  Configuration server
*/

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: "dist/html",
      directory: true
    },
    browser: "chrome"
  });
});


/*
  Configuration des fichiers sass et css
*/

sass.compiler = require('node-sass');

gulp.task('css', function () {
  return gulp.src('src/assets/sass/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('src/assets/compile'));
});

gulp.task('css:watch', function () {
  gulp.watch('src/assets/sass/*.scss', ['css']);
});


/*
  Configuration de l'autoprefixer
*/

gulp.task('autoprefixer', () =>
  gulp.src('src/assets/sass/compile/*.css')
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('dist/assets/css'))
);


/*
  Configuration du twig
*/

gulp.task('compile', function () {
  return gulp.src('src/twig/pages/*.twig')
    .pipe(twig({}))
    .pipe(gulp.dest('dist/html'));
});


/*
  Configuration de l'uglify js
*/

gulp.task('compressjs', function () {
  return pipeline(
    gulp.src('src/assets/js/*.js'),
    uglifyjs(),
    gulp.dest('dist/assets/js/compress')
  );
});


/*
  Configuration de l'uglify js
*/

gulp.task('compresscss', function () {
  gulp.src('dist/assets/css/*.css')
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": false
    }))
    .pipe(gulp.dest('dist/assets/css/compress'));
});


/*
  Configuration de la copie des fichiers js
*/

gulp.task('copyjs', function(){
  gulp.src('src/assets/js/*.js')
    .pipe(gulp.dest('dist/assets/js'))
})


/*
  Configuration de tâches exécutées simultanéments
*/

gulp.task('default', ['compile', 'css']);