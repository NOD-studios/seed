import fs from 'fs';
import gulp from 'gulp';
import args from '../args';
import paths from '../paths';
import runSequence from 'run-sequence';
import LoadPlugins from 'gulp-load-plugins';
import changelog from 'conventional-changelog';

const plugins = new LoadPlugins();

// utilizes the bump plugin to bump the
// semver for the repo
gulp.task('bump-version', () => {
  return gulp
    .src(['./package.json'])
    .pipe(plugins.bump({
      type : `${args.bump}`
    })) //major|minor|patch|prerelease
    .pipe(gulp.dest('./'));
});

// generates the CHANGELOG.md file based on commit
// from git commit messages
gulp.task('changelog', (callback) => {
  let pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

  let log = changelog({
    repository : pkg.repository.url,
    version    : pkg.version,
    file       : `${paths.doc}/CHANGELOG.md`
  }, (error, log) => {
    fs.writeFileSync(`${paths.doc}/CHANGELOG.md`, log);
  });
  console.log(log);
});

// calls the listed sequence of tasks in order
gulp.task('prepare', (callback) => {
  return runSequence(
    'lint',
    'build',
    'doc',
    'bump-version',
    'repo-add',
    'repo-commit',
    'changelog',
    'repo-tag',
    callback
  );
});

// calls the listed sequence of tasks in order
gulp.task('release', (callback) => {
  return runSequence(
    'prepare',
    'repo-push',
    callback
  );
});
