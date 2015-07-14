import fs from 'fs';
import childProcess from 'child_process';
import gulp from 'gulp';
import args from '../args';
import runSequence from 'run-sequence';

const exec = childProcess.exec;

gulp.task('preinstall', ['repo-pull'], (callback) => {
  if (callback) {
    callback();
  }
});

gulp.task('postinstall', ['install-jspm'], (callback) => {
  if (callback) {
    callback();
  }
});

gulp.task('install-npm', (callback) => {
  let options = args.options || '';
  return exec(`npm install ${options}`,
    (error, stdout, stderror) => {
      console.log(stdout);
      console.log(stderror);
      callback(error);
    });
});

gulp.task('install-jspm', (callback) => {
  let options = args.options || '';
  return exec(`jspm install ${options}`,
    (error, stdout, stderror) => {
      console.log(stdout);
      console.log(stderror);
      callback(error);
    });
});

gulp.task('install-composer', (callback) => {
  let options = args.options || '';
  return exec(`composer install ${options}`,
    (error, stdout, stderror) => {
      console.log(stdout);
      console.log(stderror);
      callback(error);
    });
});

gulp.task('install', (callback) => {
  return runSequence(
    ['install-composer', 'install-jspm', 'install-npm'], callback
  );
});
