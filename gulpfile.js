const gulp = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');

gulp.task('clean', () => {
  return gulp.src('dist', { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task('sass', () => {
  return gulp
    .src('src/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('assets', () => {
  return gulp.src('public/img/*').pipe(gulp.dest('dist/img'));
});

gulp.task('html', () => {
  return gulp
    .src('public/index.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series('clean', 'sass', 'assets', 'html'));
