import env from './env';

let paths = {
  sourceMapRelativePath : '../',
  js                    : env.DIR_JS,
  css                   : env.DIR_CSS,
  doc                   : env.DIR_DOC,
  root                  : env.DIR_ROOT,
  html                  : env.DIR_HTML,
  less                  : env.DIR_LESS,
  test                  : env.DIR_TEST,
  vendor                : env.DIR_VENDOR,
  e2eSpecsSrc           : `${env.DIR_TEST}/e2e/src/*.js`,
  e2eSpecsDist          : `${env.DIR_TEST}/e2e/dist/`,
  output                : {
    js   : env.DIR_DIST,
    css  : env.DIR_DIST,
    html : env.DIR_DIST,
    less : env.DIR_CSS
  },
  source                : {
    js   : env.DIR_JS + '/**/*.js',
    css  : env.DIR_CSS + '/**/*.css',
    less : env.DIR_LESS + '/**/*.less',
    html : env.DIR_TEMPLATE + '/**/*.html'
  }
};

export default paths;
