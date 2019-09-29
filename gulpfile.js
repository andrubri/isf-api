'use strict';

const gulp = require('gulp');
const shell = require('gulp-shell');


const compile = (cb) =>{
  shell.task(['npm run tsc']);
  cb();
};

const configs = (cb) => {
  console.log('Set Configuration .... ');
  return gulp.src("src/configurations/*.json")
      .pipe(gulp.dest('./build/configurations'));
  cb();
};

const build = async (cb) => {
  console.log('Building the project ...');
  await gulp.series(compile, configs);
  cb();
};

exports.build = gulp.series(compile, configs);
exports.default = build;
