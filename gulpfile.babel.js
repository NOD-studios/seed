import env from './build/env';
import requireDir from 'require-dir';

requireDir(`${env.DIR_ROOT}${env.DIR_BUILD}/${env.DIR_TASK}`);
