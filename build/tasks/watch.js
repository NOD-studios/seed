import gulp from 'gulp';
import paths from '../paths';
import browserSync from 'browser-sync';

// outputs changes to files to the console
export function reportChange(event) {
  console.log(`File ${event.path} was ${event.type}, running tasks...`);
}

// this task will watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch', ['serve'], () => {
  gulp.watch(paths.source.js, ['build-system', browserSync.reload])
    .on('change', reportChange);
  gulp.watch(paths.source.css, ['build-css', browserSync.reload])
    .on('change', reportChange);
  gulp.watch(paths.source.less, ['build-less', browserSync.reload])
    .on('change', reportChange);
  gulp.watch(paths.source.html, ['build-html', browserSync.reload])
    .on('change', reportChange);
});
