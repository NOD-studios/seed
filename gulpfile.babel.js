import gulpSimpleLoadTasks from 'gulp-simple-load-tasks'
import { join } from 'path'
import gulp from 'gulp'

const loadTasks = gulpSimpleLoadTasks(gulp)
export default ([
  gulp,
  loadTasks,
  gulp.loadTasks( join( __dirname, 'tasks') ) ]
)[0]
