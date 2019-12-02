'use strict';

const gulp = require('gulp');
const shell = require('gulp-shell');


const compile = (cb) =>{
  shell.task(['npm run tsc']);
  cb();
};

const configs = async (cb) => {
  console.log('Set Configuration .... ');
  await gulp.src("src/configurations/*.json")
      .pipe(gulp.dest('./build/configurations'));
  console.log('Set Templates .... ');
  await gulp.src("src/template/*.html")
      .pipe(gulp.dest('./build/template'));
  console.log('Set Images .... ');
  await gulp.src("src/images/*.jpg")
      .pipe(gulp.dest('./build/images'));
  cb();
};

const build = async (cb) => {
  console.log('Building the project ...');
  await gulp.series(compile, configs);
  cb();
};

exports.build = gulp.series(compile, configs);
exports.default = build;
