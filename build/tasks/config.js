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

gulp.task('config-package', () => {
  return gulp
    .src('./package.json')
    .pipe(plugins.jsonEditor({
      'name'        : dashify(env.INFO_NAME.toLowerCase()),
      'description' : env.INFO_DESCRIPTION,
      'repository'  : env.GIT_REPO
    }))
    .pipe(gulp.dest("./"));
});

gulp.task('config-composer', () => {
  let name = {
    package : dashify(env.INFO_NAME.toLowerCase()),
    vendor  : dashify(env.VENDOR_NAME.toLowerCase())
  };

  return gulp
    .src('./composer.json')
    .pipe(plugins.jsonEditor({
      'name' : `${name.vendor}/${name.package}`
    }))
    .pipe(gulp.dest("./"));
});

gulp.task('config-sync', () => {
  gulp
    .src(['./bower.json', './composer.json', './package.json'])
    .pipe(plugins.configSync())
    .pipe(gulp.dest('./'));
});

gulp.task('config', [
  'config-package',
  'config-sync',
  'config-composer'
]);
