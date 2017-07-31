import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'

export default () => {

  const

    $ = gulpLoadPlugins(),

    shellParams = {
      env : { FORCE_COLOR : true }
    },

    errorLog = (message = 'Unknown', prefix = 'Error') => $
      .util
      .log(`${ prefix !== false
        ? $.util.colors.yellow(`[${ prefix }] : `)
        : '' }${ $.util.colors.red(`${ message }\n`) }`),

    gitPush = $.git.push,

    ENV_DEVELOPMENT = 'development',

    ENV_PRODUCTION = 'production',

    ENV_TEST = 'test',

    gulpSrcWithHandler = (src = '.') =>
      gulp
        .src(src)
        .pipe($.plumber({ errorHandler }))

  function errorHandler(error, prefix) {
    return [ errorLog(error, prefix), this.emit('end') ]
  }

  return [

    gulp.task('env-test', cb => [ $.env.set({ NODE_ENV : ENV_TEST }), cb() ]),

    gulp.task('env-production', cb => [
      $.env.set({ NODE_ENV : ENV_PRODUCTION }),
      cb()
    ]),

    gulp.task('env-development', cb => [
      $.env.set({ NODE_ENV : ENV_DEVELOPMENT }),
      cb()
    ]),

    gulp.task('build', [ 'env-production' ], () =>
      gulpSrcWithHandler()
        .pipe($.shell('node ./scripts/build.js', shellParams))),

    gulp.task('start-client', [ 'env-development' ], () =>
      gulpSrcWithHandler()
        .pipe($.shell('node ./scripts/start.js', shellParams))),

    gulp.task('start-server', [ 'env-development' ], () =>
      gulpSrcWithHandler()
        .pipe($.shell(process.env['NODE_ENV'] === 'production'
          ? 'hz serve'
          : 'hz serve --dev', shellParams))),

    gulp.task('start-client-production', [ 'env-production' ], () =>
      gulpSrcWithHandler()
        .pipe($.shell('node ./scripts/start.js', shellParams))),

    gulp.task('start-server-production', [ 'env-production' ], () =>
      gulpSrcWithHandler()
        .pipe($.shell(process.env['NODE_ENV'] === 'production'
          ? 'hz serve'
          : 'hz serve --dev', shellParams))),

    gulp.task('default', [ 'start-server', 'start-client' ]),

    gulp.task('gh-pages', [ 'build' ], () =>
      gulpSrcWithHandler('./build/**/*')
        .pipe($.ghPages({ force : true }))),

    gulp.task('preversion-git-add', [ 'build' ], () =>
      gulpSrcWithHandler()
        .pipe($.git.add({ args : '-A' }, error =>
          errorHandler(error, 'git')))),

    gulp.task('preversion', [ 'preversion-git-add', 'test' ]),

    gulp.task('postversion-git-push', cb =>
      gitPush('origin', [ 'master' ], { args : " --tags" }, cb)),

    gulp.task('postversion-deploy-gh-page', cb =>
      gitPush('origin', [ 'master' ], { args : " --tags" }, cb)),

    gulp.task('postversion', [ 'postversion-git-push' ]),

    gulp.task('postpublish', [ 'gh-pages' ]),

    $.npmScriptSync(gulp),

    gulp

  ]

}
