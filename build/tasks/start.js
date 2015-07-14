import gulp from 'gulp';

gulp.task('start', ['watch', 'build'], (callback) => {
  if (callback) {
    callback();
  }
});
