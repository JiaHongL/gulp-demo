const gulp = require('gulp');
const webserver = require('gulp-webserver');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const depLinker = require('dep-linker');
const compass = require('gulp-compass');
const autoprefixer = require('gulp-autoprefixer');
const fse = require('fs-extra')
const babel = require('gulp-babel');

// i. creat webserver
gulp.task('webserver', () => {
  gulp.src('./src')
    .pipe(webserver({
      port: 8000,
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }));
});

// ii. scss -> css (autoprefixer)
gulp.task('compass', () => {
  return gulp.src('src/style/scss/*.scss')
    .pipe(compass({
      sass: 'src/style/scss/',
      css: 'src/style/css/',
      sourcemap: false,
      style: 'compact',
      comments: false
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('src/style/css/'));
})

// iii. copy npm dependencies  ( web plugins )
gulp.task('copydependencies:src', () => {
  return depLinker.linkDependenciesTo('src/assets/plugins');
});

// iv. uglify JavaScript (js babel)
gulp.task('uglifyJS', () => {
  return gulp.src('src/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js/min'));
});

// v. watch file change
gulp.task('watch', () => {
  gulp.watch('src/style/scss/*.scss', ['compass']);
  gulp.watch('src/style/scss/*/*.scss', ['compass']);
  gulp.watch('src/js/*.js', ['uglifyJS']);
  gulp.watch('package.json', ['copydependencies:src']);
});

// vi. copyfile to dist
gulp.task('copyfile', () => {
  // remove dist folder
  fse.remove('./dist').then(() => {
    console.log('remove!');
    // output html
    gulp.src('src/*.html').pipe(gulp.dest('dist/'));
    // output js
    gulp.src('src/js/min/app.min.js').pipe(gulp.dest('dist/js/min'));
    // output css
    gulp.src('src/style/css/style.css').pipe(gulp.dest('dist/style/css/'));
    // output assets folder
    fse.copy('src/assets', 'dist/assets')
      .then(() => console.log('success!'))
      .catch(err => console.error('assets error', err));
  }).catch(err => console.error('remove dist error', err));
});

// vii. file output dist
gulp.task('product', ['copyfile']);

// viii. default
gulp.task('default', ['webserver', 'watch']);