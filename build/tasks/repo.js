import fs from 'fs';
import childProcess from 'child_process';
import gulp from 'gulp';
import args from '../args';
import env from '../env';
import gitignoreParser from 'gitignore-parser';
import mergeStream from 'merge-stream';
import LoadPlugins from 'gulp-load-plugins';

const plugins = new LoadPlugins();
const exec = childProcess.exec;

gulp.task('repo-pull', (callback) => {
  let options = args.options || '';
  return exec(`git push ${options} ${env.GIT_REMOTE} ${env.GIT_BRANCH}`,
    (error, stdout, stderror) => {
      console.log(stdout);
      console.log(stderror);
      callback(error);
    });
});

gulp.task('repo-add', (callback) => {
  let options = args.options || '--all';
  return exec(`git add ${options}`,
    (error, stdout, stderror) => {
      console.log(stdout);
      console.log(stderror);
      callback(error);
    });
});

gulp.task('repo-tag', (callback) => {
  let pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  let options = args.options || '';
  return exec(`git tag ${options} v${pkg.version}`,
    (error, stdout, stderror) => {
      console.log(stdout);
      console.log(stderror);
      callback(error);
    });
});

gulp.task('repo-remove-tag', (callback) => {
  let pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  let options = args.options || '';
  return exec(`git tag ${options} -d v${pkg.version}`,
    (error, stdout, stderror) => {
      console.log(stdout);
      console.log(stderror);
      callback(error);
    });
});



// Run git commit
gulp.task('repo-commit', (callback) => {
  let options = args.options || '--all';
  return exec(`git commit ${options} --message '${args.message}'`,
    (error, stdout, stderror) => {
      console.log(stdout);
      console.log(stderror);
      callback(error);
    });
});

gulp.task('repo-push', (callback) => {
  let options = args.options || '';
  return exec(`git push ${options} ${env.GIT_REMOTE} ${env.GIT_BRANCH}`,
    (error, stdout, stderror) => {
      console.log(stdout);
      console.log(stderror);
      callback(error);
    });
});

gulp.task('repo-push-tags', (callback) => {
  let pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  let options = args.options || '';
  return exec(`git push ${options} --tags`,
    (error, stdout, stderror) => {
      console.log(stdout);
      console.log(stderror);
      callback(error);
    });
});
