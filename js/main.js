(function (window, require) {
  'use strict';
  require.config({
    waitSeconds: 500,
    paths: {
      propertyParser: '../bower_components/requirejs-plugins/src/propertyParser',
      lessc: '../bower_components/less.js/dist/less.min',
      normalize: '../bower_components/require-css/normalize',
      facebook: '//connect.facebook.net/en_US/all',
      'app/img': '../img',
      'app/css': 'app/../../css',
      'app/less': 'app/../../less',
      can: '../bower_components/canjs/amd-dev/can',
      bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
      canjs: '../bower_components/canjs/can.jquery',
      jquery: '../bower_components/jquery/dist/jquery',
      less: '../bower_components/less.js/dist/less',
      css: '../bower_components/require-css/css',
      'css-builder': '../bower_components/require-css/css-builder',
      requirejs: '../bower_components/requirejs/require',
      async: '../bower_components/requirejs-plugins/src/async',
      depend: '../bower_components/requirejs-plugins/src/depend',
      font: '../bower_components/requirejs-plugins/src/font',
      goog: '../bower_components/requirejs-plugins/src/goog',
      image: '../bower_components/requirejs-plugins/src/image',
      json: '../bower_components/requirejs-plugins/src/json',
      mdown: '../bower_components/requirejs-plugins/src/mdown',
      noext: '../bower_components/requirejs-plugins/src/noext',
      'Markdown.Converter': '../bower_components/requirejs-plugins/lib/Markdown.Converter',
      text: '../bower_components/requirejs-plugins/lib/text',
      respond: '../bower_components/respond/dest/respond.src',
      webfontloader: '../bower_components/webfontloader/webfontloader'
    },
    shim: {
      facebook: {
        exports: 'FB'
      }
    },
    map: {
      '*': {
        font: 'font',
        text: 'text',
        less: 'less',
        css: 'css'
      }
    },
    packages: [
  
    ]
  });
  return require;
}) (window, require);
