'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

export default () => {

  const

    $ = gulpLoadPlugins(),

    shellParams = {
      env: { FORCE_COLOR : true }
    },

    errorLog = (message = 'Unknown', prefix = 'Error') => {
      prefix = prefix !== false ? $.util.colors.yellow(`[${prefix}] : `) : '';
      message = $.util.colors.red(`${message}\n`);

      return $.util.log(`${prefix}${message}`);
    },

    errorHandler = function (error, prefix) {
      errorLog(error, prefix);
      this.emit('end');
    };

  gulp.task('env-test', (cb) => {
    process.env.NODE_ENV = 'test';
    cb();
  });

  gulp.task('env-production', (cb) => {
    process.env.NODE_ENV = 'production';
    cb();
  });

  gulp.task('env-development', (cb) => {
    process.env.NODE_ENV = 'development';
    cb();
  });

  // gulp.task('tdd', ['env-test'], () => gulp
  //   .src('.')
  //   .pipe($.plumber({ errorHandler }))
  //   .pipe($.shell('jest --watch --env=jsdom', shellParams)));

  gulp.task('test', ['env-test'], () => gulp
    .src('.')
    .pipe($.plumber({ errorHandler }))
    .pipe($.shell('jest --env=jsdom', shellParams)));

  gulp.task('build', ['env-production'], () => gulp
    .src('.')
    .pipe($.plumber({ errorHandler }))
    .pipe($.shell('node ./scripts/build.js', shellParams)));

  gulp.task('start', ['env-development'], () => gulp
    .src('.')
    .pipe($.plumber({ errorHandler }))
    .pipe($.shell('node ./scripts/start.js', shellParams)));

  gulp.task('gh-pages', ['build'], () => gulp
    .src('./build/**/*')
    .pipe($.ghPages({
      force : true
    })));

  gulp.task('preversion-git-add', ['build'], () => gulp
    .src('.')
    .pipe($.plumber({ errorHandler }))
    .pipe($.git.add({ args: '-A' }, (error) => errorHandler(error, 'git'))));

  gulp.task('preversion', ['preversion-git-add', 'test'], (cb) => {
    console.log('preversion!!');
    cb();
  });

  gulp.task('postversion-git-push', cb => $.git.push('origin', ['master'], { args: " --tags" }, cb));

  gulp.task('postversion-deploy-gh-page', cb => $.git.push('origin', ['master'], { args: " --tags" }, cb));

  gulp.task('postversion', ['postversion-git-push']);

  gulp.task('postpublish', ['gh-pages']);

  gulp.task('default', ['start']);

  $.npmScriptSync(gulp);

}
