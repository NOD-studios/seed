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

gulp.task('repo-add', (callback) => {
  return exec(`git add --all`, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});

gulp.task('repo-tag', (callback) => {
  return exec(`git tag v${pkg.version}`, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});

gulp.task('repo-remove-tag', (callback) => {
  let pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  return exec(`git tag -d v${pkg.version}`, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});

// Run git commit
gulp.task('repo-commit', (callback) => {
  return exec(`git commit --all --message '${args.message}'`,
    (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      callback(err);
    });
});

gulp.task('repo-push', (callback) => {
  return plugins.git.push(env.GIT_REMOTE, env.GIT_BRANCH, (err) => {
    if (err) {
      throw err;
    }
    return true;
  });
});

gulp.task('repo-push-tag', (callback) => {
  let pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

  return exec(`git push ${env.GIT_REMOTE} v${pkg.version}`,
    (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      callback(err);
    });
});
