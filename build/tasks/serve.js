import gulp from 'gulp';
import env from '../env';
import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], done => {
  browserSync({
    open            : false,
    port            : env.PORT || 9000,
    reloadOnRestart : true,
    server          : env.PROXY ? false : {
      baseDir    : ['.'],
      middleware : [historyApiFallback, (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }]
    },
    proxy           : env.PROXY ? env.PROXY : false,
    ghostMode       : env.GHOST_MODE ? {
      clicks   : true,
      location : true,
      scroll   : true,
      forms    : {
        'submit'  : true,
        'inputs'  : true,
        'toggles' : true
      }
    } : false
  }, done);
});
