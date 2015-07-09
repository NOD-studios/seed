import env from './build/env';
import requireDir from 'require-dir';
import gulp from 'gulp';
import LoadPlugins from 'gulp-load-plugins';

const plugins = LoadPlugins();

requireDir(`./${env.DIR_BUILD}/${env.DIR_TASK}`);

plugins.npmScriptSync(gulp);
