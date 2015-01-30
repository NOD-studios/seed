(function (window, require) {
  'use strict';
  require.config({
    //baseUrl     : './',
    waitSeconds : 0,
    paths       : {
      'propertyParser'    : '../bower_components/requirejs-plugins/src/propertyParser',
      'lessc'             : '../bower_components/less.js/dist/less.min',
      'normalize'         : '../bower_components/require-css/normalize',
      'requirejs-plugins' : '../bower_components/requirejs-plugins',
      'require-css'       : '../bower_components/require-css',
      'css-builder'       : '../bower_components/require-css/css-builder',
      'require-less'      : '../bower_components/require-less',
      'less-builder'      : '../bower_components/require-less/less-builder',
      'can'               : '../bower_components/canjs/amd-dev/can',

      'facebook'          : '//connect.facebook.net/en_US/all',

      'jquery'            : [
        '//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min',
        '../bower_components/jquery/dist/jquery.min'
      ],

      'app/img'           : '../img',
      //'fonts'           : '../fonts',

      'app/css'           : 'app/../../css',
      'app/less'          : 'app/../../less',

      'bootstrap'         : '../bower_components/bootstrap/less',
      'respond'           : [
        '//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min',
        '../bower_components/respond/dest/respond.min'
      ],
      'normalize.css'     : '../bower_components/normalize.css'
    },
    shim        : {
      'facebook' : {
        exports : 'FB'
      }
    },
    map         : {
      '*': {
        'font' : 'requirejs-plugins/src/font',
        'text' : 'requirejs-plugins/lib/text',
        'less' : 'require-less/less',
        'css'  : 'require-css/css.min'
      }
    }
  });

  return require(['app'], function(app) {
    return app.init();
  });

}) (window, window.require);
