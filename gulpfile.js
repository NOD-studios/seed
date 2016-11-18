const
  env = process.env.NODE_ENV,
  dir = __dirname,
  gulp = require('gulp');

process.env.NODE_ENV = env || 'development';

require('babel-core/register');
require('gulp-simple-load-tasks')(gulp);

gulp.loadTasks(`${dir}/tasks`);

