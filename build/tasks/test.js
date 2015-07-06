import gulp from 'gulp';
import karma  from 'karma';
import paths  from '../paths';

const configFile = `${__dirname}/../../${paths.js}/karma.conf.js`;

/**
 * Run test once and exit
 */
gulp.task('test', done => {
  karma.server.start({
    configFile : configFile,
    singleRun  : true
  }, error => {
    done();
  });
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', done => {
  karma.server.start({
    configFile : configFile
  }, error => {
    done();
  });
});
