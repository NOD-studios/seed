import gulp from 'gulp';
import paths from '../paths';
import tools from 'aurelia-tools';
import LoadPlugins from 'gulp-load-plugins';

const plugins = new LoadPlugins();

// uses yui to generate documentation to doc/api.json
gulp.task('doc-generate', () => {
  return gulp.src(paths.source.js)
    .pipe(plugins.yuidoc.parser(null, 'api.json'))
    .pipe(gulp.dest(paths.doc));
});

// takes output of doc-generate task
// and cleans it up for use with aurelia
// documentation app
gulp.task('doc', ['doc-generate'], () => {
  tools.transformAPIModel(paths.doc);
});
