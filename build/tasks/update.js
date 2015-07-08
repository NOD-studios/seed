import fs from 'fs';
import childProcess from 'child_process';
import gulp from 'gulp';
import args from '../args';
import runSequence from 'run-sequence';

const exec = childProcess.exec;

gulp.task('update-npm', (callback) => {
  let options = args.options || '';
  return exec(`npm update ${options}`,
    (error, stdout, stderror) => {
      console.log(stdout);
      console.log(stderror);
      callback(error);
    });
});

gulp.task('update-jspm', (callback) => {
  let options = args.options || '';
  return exec(`jspm update ${options}`,
    (error, stdout, stderror) => {
      console.log(stdout);
      console.log(stderror);
      callback(error);
    });
});

gulp.task('update-composer', (callback) => {
  let options = args.options || '';
  return exec(`composer update ${options}`,
    (error, stdout, stderror) => {
      console.log(stdout);
      console.log(stderror);
      callback(error);
    });
});

gulp.task('update', (callback) => {
  return runSequence(
    ['update-composer', 'update-jspm', 'update-npm', 'repo-pull'], callback
  );
});
