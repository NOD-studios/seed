import gulp from 'gulp';
import LoadPlugins from 'gulp-load-plugins';
import paths from '../paths';

const plugins = new LoadPlugins();
const webdriverUpdate = plugins.protractor.webdriver_update;
const protractor = plugins.protractor.protractor;

// for full documentation of gulp-protractor,
// please check https://github.com/mllrsohn/gulp-protractor
gulp.task('webdriver_update', webdriverUpdate);

// transpiles files in
// /test/e2e/src/ from es6 to es5
// then copies them to test/e2e/dist/
gulp.task('build-e2e', () => {
  return gulp.src(paths.e2eSpecsSrc)
    .pipe(plugins.plumber())
    .pipe(plugins.babel())
    .pipe(gulp.dest(paths.e2eSpecsDist));
});

// runs build-e2e task
// then runs end to end tasks
// using Protractor: http://angular.github.io/protractor/
gulp.task('e2e', ['webdriver_update', 'build-e2e'], callback => {
  return gulp.src(`${paths.e2eSpecsDist}/*.js`)
    .pipe(protractor({
      configFile: `${paths.js}/protractor.conf.js`,
      args: ['--baseUrl', 'http://127.0.0.1:9000']
    }))
    .on('error', function(error) {
      throw error;
    });
});
