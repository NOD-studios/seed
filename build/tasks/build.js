import env from '../env';
import paths from '../paths';
import babelOptions from '../babel-options';

import gulp from 'gulp';
import LoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import objectAssign from 'object.assign';
import LessPluginCleanCSS from 'less-plugin-clean-css';
import LessPluginAutoPrefix from 'less-plugin-autoprefix';
import lessInlineUrls from 'less-plugin-inline-urls';
import Loader from 'systemjs';

const plugins   = new LoadPlugins();
let vendorPaths = [];
Object.assign = Object.assign || objectAssign;

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

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber

gulp.task('build-js', ['lint'], () => {
  return gulp.src(paths.source.js)
    .pipe(plugins.plumber())
    // .pipe(plugins.changed(paths.output.js, {
    //   extension : '.js'
    // }))
    .pipe(plugins.cached('build-js'))
    .pipe(plugins.sftp({
      host       : env.SYNC_HOST,
      port       : env.SYNC_PORT,
      user       : env.SYNC_USER,
      remotePath : `${env.SYNC_PATH}/${paths.js}/`,
      key        : env.SYNC_KEY
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
    .pipe(plugins.debug())
    .pipe(plugins.plumber.stop())
    .pipe(gulp.dest(paths.output.js))
    .pipe(plugins.sftp({
      host       : env.SYNC_HOST,
      port       : env.SYNC_PORT,
      user       : env.SYNC_USER,
      remotePath : `${env.SYNC_PATH}/${paths.output.js}/`,
      key        : env.SYNC_KEY
    }));
});

// copies changed html files to the output directory
gulp.task('build-html', () => {
  return gulp.src(paths.source.html)
    // .pipe(plugins.changed(paths.output.html, {
    //   extension : '.html'
    // }))
    .pipe(plugins.cached('build-html'))
    .pipe(plugins.debug())
    .pipe(gulp.dest(paths.output.html))
    .pipe(plugins.sftp({
      host       : env.SYNC_HOST,
      port       : env.SYNC_PORT,
      user       : env.SYNC_USER,
      remotePath : `${env.SYNC_PATH}/${paths.html}/`,
      key        : env.SYNC_KEY
    }));
});

gulp.task('build-less', ['vendor-paths'], () => {
  let lessCleanCss = new LessPluginCleanCSS({
    advanced : true
  }),
  lessAutoPrefix = new LessPluginAutoPrefix({
    browsers : ['last 2 versions']
  });

  return gulp.src(paths.source.less)
    .pipe(plugins.plumber())
    // .pipe(plugins.changed(paths.output.less, {
    //   extension: '.less'
    // }))
    .pipe(plugins.cached('build-less'))
    .pipe(plugins.sftp({
      host           : env.SYNC_HOST,
      port           : env.SYNC_PORT,
      user           : env.SYNC_USER,
      remotePath     : `${env.SYNC_PATH}/${paths.less}/`,
      key            : env.SYNC_KEY,
      remotePlatform : env.SYNC_PLATFORM
    }))
    .pipe(plugins.debug())
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
    .pipe(gulp.dest(paths.output.less))
    .pipe(plugins.sftp({
      host           : env.SYNC_HOST,
      port           : env.SYNC_PORT,
      user           : env.SYNC_USER,
      remotePath     : `${env.SYNC_PATH}/${paths.output.less}/`,
      key            : env.SYNC_KEY,
      remotePlatform : env.SYNC_PLATFORM
    }));
});

gulp.task('build-css', () => {
  return gulp.src(paths.source.css)
    .pipe(plugins.plumber())
    // .pipe(plugins.changed(paths.output.css, {
    //   extension: '.css'
    // }))
    .pipe(plugins.cached('build-css'))
    .pipe(plugins.debug())
    .pipe(gulp.dest(paths.output.css))
    .pipe(plugins.sftp({
      host           : env.SYNC_HOST,
      port           : env.SYNC_PORT,
      user           : env.SYNC_USER,
      remotePath     : `${env.SYNC_PATH}/${paths.output.css}/`,
      key            : env.SYNC_KEY,
      remotePlatform : env.SYNC_PLATFORM
    }));
});

gulp.task('build-font', () => {
  return gulp.src(paths.source.font)
    // .pipe(plugins.changed(paths.output.font))
    .pipe(plugins.cached('build-font'))
    .pipe(plugins.debug())
    .pipe(gulp.dest(paths.output.font))
    .pipe(plugins.sftp({
      host           : env.SYNC_HOST,
      port           : env.SYNC_PORT,
      user           : env.SYNC_USER,
      remotePath     : `${env.SYNC_PATH}/${paths.output.font}/`,
      key            : env.SYNC_KEY,
      remotePlatform : env.SYNC_PLATFORM
    }));
});

gulp.task('build-image', () => {
  return gulp.src(paths.source.image)
    // .pipe(plugins.changed(paths.output.font))
    .pipe(plugins.cached('build-image'))
    .pipe(plugins.debug())
    .pipe(gulp.dest(paths.output.image))
    .pipe(plugins.sftp({
      host           : env.SYNC_HOST,
      port           : env.SYNC_PORT,
      user           : env.SYNC_USER,
      remotePath     : `${env.SYNC_PATH}/${paths.output.image}/`,
      key            : env.SYNC_KEY,
      remotePlatform : env.SYNC_PLATFORM
    }));
});

gulp.task('build-icon', () => {
  return gulp.src(paths.source.icon)
    // .pipe(plugins.changed(paths.output.icon))
    .pipe(plugins.cached('build-icon'))
    .pipe(plugins.debug())
    .pipe(gulp.dest(paths.output.icon))
    .pipe(plugins.sftp({
      host           : env.SYNC_HOST,
      port           : env.SYNC_PORT,
      user           : env.SYNC_USER,
      remotePath     : `${env.SYNC_PATH}/${paths.output.icon}/`,
      key            : env.SYNC_KEY,
      remotePlatform : env.SYNC_PLATFORM
    }));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', (callback) => {
  return runSequence(
    'clean',
    [
      'build-image',
      'build-font',
      'build-icon',
      'build-html',
      'build-less',
      'build-css',
      'build-js'
    ],
    callback
  );
});
