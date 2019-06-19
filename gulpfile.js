const gulp = require('gulp');
const browserSync = require('browser-sync');
const twig = require('gulp-twig');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglifyjs = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const pipeline = require('readable-stream').pipeline;


/*
  Configurations
*/

const autoprefixerOption = { 
    browsers : ['last 2 versions'],
    cascade : false
};

const serverOption = {
  baseDir: "dist/html",
  directory: true
};


/* 
  Tâches server
*/

gulp.task('serve', function () {
  browserSync.init({
    server: { serverOption },
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
    .pipe(autoprefixer({ autoprefixerOption }))
    .pipe(gulp.dest('dist/assets/css')) 
});


/*
  Configuration du twig
*/

gulp.task('html', function () {
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
  Configuration de l'uglify css
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


/**
  Configuration du watch
*/

gulp.task('watch', function() {
  gulp.watch('src/assets/sass/**/*.scss', ['css']);
  gulp.watch('src/twig/**/*.twig', ['html']);
  gulp.watch('src/assets/js/**/*.js', ['copyjs']);
});



/*
  Configuration de tâches exécutées simultanéments
*/

gulp.task('default', ['html', 'css', 'copyjs', 'watch']);