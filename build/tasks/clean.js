import gulp from 'gulp';
import paths from '../paths';
import del  from 'del';
import vinylPaths from 'vinyl-paths';

// deletes all files in the output path
gulp.task('clean', () => {
  return gulp.src([
    paths.dist
  ])
    .pipe(vinylPaths(del));
});
