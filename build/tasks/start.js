import gulp from 'gulp';

gulp.task('start', ['watch'], (callback) => {
  if (callback) {
    callback();
  }
});
