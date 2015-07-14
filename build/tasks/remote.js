import env from '../env';
import paths from '../paths';
import fs from 'fs';
import gulp from 'gulp';
import LoadPlugins from 'gulp-load-plugins';

const plugins   = new LoadPlugins();
const ssh       = plugins.ssh({
  ignoreErrors : false,
  sshConfig    : {
    host       : env.REMOTE_HOST,
    port       : env.REMOTE_PORT,
    username   : env.REMOTE_USER,
    privateKey : fs.readFileSync(env.REMOTE_KEY)
  }
});

gulp.task('remote-install', () => {
  return ssh.shell([
      `cd ${env.REMOTE_PATH}`,
      'npm run install',
    ], {
      filePath: 'remote-install.log'
    })
    .pipe(gulp.dest(paths.log));
});

gulp.task('remote-update', ['remote-install'], () => {
  return ssh.shell([
      `cd ${env.REMOTE_PATH}`,
      'npm run update'
    ], {
      filePath: 'remote-update.log'
    })
    .pipe(gulp.dest(paths.log));
});
