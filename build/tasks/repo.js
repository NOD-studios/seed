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
  args.options = args.options || '';
  return exec(`git push ${args.options} ${env.GIT_REMOTE} ${env.GIT_BRANCH}`,
    (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      callback(err);
    });
});

gulp.task('repo-add', (callback) => {
  args.options = args.options || '--all';
  return exec(`git add ${args.options} ${args.options}`, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});

gulp.task('repo-tag', (callback) => {
  let pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  args.options = args.options || '';
  return exec(`git tag ${args.options} v${pkg.version}`, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});

gulp.task('repo-remove-tag', (callback) => {
  let pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  args.options = args.options || '';
  return exec(`git tag ${args.options} -d v${pkg.version}`, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});



// Run git commit
gulp.task('repo-commit', (callback) => {
  args.options = args.options || '--all';
  return exec(`git commit ${args.options} --message '${args.message}'`,
    (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      callback(err);
    });
});

gulp.task('repo-push', (callback) => {
  args.options = args.options || '';
  return exec(`git push ${args.options} ${env.GIT_REMOTE} ${env.GIT_BRANCH}`,
    (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      callback(err);
    });
});

gulp.task('repo-push-tags', (callback) => {
  let pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  args.options = args.options || '';
  return exec(`git push ${args.options} --tags`,
    (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      callback(err);
    });
});
