import gulp from 'gulp';
import LoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import paths from '../paths';
import babelOptions from '../babel-options';
import objectAssign from 'object.assign';
import Loader from 'systemjs';
import LessPluginCleanCSS from 'less-plugin-clean-css';
import LessPluginAutoPrefix from 'less-plugin-autoprefix';
import lessInlineUrls from 'less-plugin-inline-urls';

const plugins = new LoadPlugins();
Object.assign = Object.assign || objectAssign;

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', ['lint'], () => {
  return gulp.src(paths.source.js)
    .pipe(plugins.plumber())
    .pipe(plugins.changed(paths.output.js, {
      extension : '.js'
    }))
    .pipe(plugins.sourcemaps.init({
      loadMaps : true
    }))
    .pipe(plugins.babel(Object.assign({}, babelOptions, {
      modules : 'system'
    })))
    .pipe(plugins.sourcemaps.write({
      includeContent : false,
      sourceRoot     : paths.sourceMapRelativePath
    }))
    .pipe(plugins.plumber.stop())
    .pipe(gulp.dest(paths.output.js));
});

// copies changed html files to the output directory
gulp.task('build-html', () => {
  return gulp.src(paths.source.html)
    .pipe(plugins.changed(paths.output.html, {
      extension : '.html'
    }))
    .pipe(gulp.dest(paths.output.html));
});

const vendorPaths = [];

gulp.task('loader-config', () => {
  return Loader.import(`${paths.js}/config.js`);
});

gulp.task('vendor-paths', ['loader-config'], () => {
  let vendorPromises = [];
  Object.keys(Loader.map).forEach(key => {
    let promise = new Promise((resolve, reject) => {
      Loader.normalize(key)
        .then(path => {
          path = path
            .replace('file:\/\/', '')
            .replace('.js', '');
          vendorPaths.push(path);
          resolve(path);
        });
    });
    vendorPromises.push(promise);
  });

  return Promise.all(vendorPromises);
});

gulp.task('build-less', ['vendor-paths'], () => {
  let lessCleanCss = new LessPluginCleanCSS({
    advanced: true
  }),
  lessAutoPrefix = new LessPluginAutoPrefix({
    browsers: ["last 2 versions"]
  });

  return gulp.src(paths.source.less)
    .pipe(plugins.plumber())
    .pipe(plugins.changed(paths.output.less, {
      extension: '.less'
    }))
    .pipe(plugins.less({
      paths   : [
        paths.less,
        paths.vendor
      ].concat(vendorPaths),
      plugins : [ lessAutoPrefix, lessInlineUrls, lessCleanCss ]
    }))
    .pipe(plugins.sourcemaps.write({
      sourceRoot : paths.sourceMapRelativePath
    }))
    .pipe(plugins.plumber.stop())
    .pipe(gulp.dest(paths.output.less));
});

gulp.task('build-css', () => {
  return gulp.src(paths.source.css)
    .pipe(plugins.plumber())
    .pipe(plugins.changed(paths.output.css, {
      extension: '.css'
    }))
    .pipe(gulp.dest(paths.output.css));
});


// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', (callback) => {
  return runSequence(
    'clean',
    ['build-system', 'build-html', 'build-less', 'build-css'],
    callback
  );
});
