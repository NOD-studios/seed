import gulp from 'gulp';
import env from '../env';
import args from '../args';
import paths from '../paths';
import runSequence from 'run-sequence';
import dashify from 'dashify';
import LoadPlugins from 'gulp-load-plugins';
import childProcess from 'child_process';

const plugins = new LoadPlugins();
const exec = childProcess.exec;

gulp.task('config', () => {
  return gulp
    .src('./package.json')
    .pipe(plugins.jsonEditor({
      'name'        : dashify(env.INFO_NAME.toLowerCase()),
      'description' : env.INFO_DESCRIPTION,
      'repository'  : env.GIT_REPO
    }))
    .pipe(gulp.dest("./"));
});

gulp.task('config-sync', () => {
  gulp
    .src(['./bower.json', './composer.json', './package.json'])
    .pipe(plugins.configSync())
    .pipe(gulp.dest('./'));
});

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
  return gulp.src('./CHANGELOG.md')
    .pipe(plugins.debug())
    .pipe(plugins.conventionalChangelog())
    .pipe(gulp.dest('./'))
    .pipe(plugins.git.add())
    .pipe(plugins.git.commit('chore(CHANGELOG): update CHANGELOG.md'));
});

// calls the listed sequence of tasks in order
gulp.task('prepare', (callback) => {
  return runSequence(
    'lint',
    'build',
    'doc',
    'bump-version',
    'config-sync',
    'repo-add',
    'repo-tag',
    'repo-commit',
    'changelog',
    callback
  );
});

// calls the listed sequence of tasks in order
gulp.task('release', (callback) => {
  return runSequence(
    'prepare',
    'repo-push',
    'repo-push-tags',
    callback
  );
});
