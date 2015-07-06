import gulp from 'gulp';
import paths from '../paths';
import jshintStylish from 'jshint-stylish';
import LoadPlugins from 'gulp-load-plugins';

const plugins = new LoadPlugins();

// runs jshint on all .js files
gulp.task('lint', () => {
  return gulp.src(paths.source.js)
    .pipe(plugins.jshint(`${__dirname}/../../.jshintrc`))
    .pipe(plugins.jshint.reporter(jshintStylish));
});
