(function (window, define, require) {
  'use strict';
  return define([
    'app',
    'env',
    'can/util/can',

    'can/view',
    'can/view/mustache',
    'can/component',

    'css!app/css/header'
  ], function(app, env, can) {
    return can.Component.extend({
      tag      : 'app-body',
      template : '<h3>{{ INFO_NAME }}</h3>',
      events   : {
        'inserted' : function() {
          console.log('inserted');
        }
      }
      // scope: can.$.extend(true, env, {
      //
      // }),
      // viewModel : {
      //   templateType : 'mustache'
      // }
      // helpers: {
      //   classLoaded : function(options) {
      //     if(options.context.attr('complete')) {
      //       return "class='loaded'";
      //     }
      //   }
      // }
    });

    return app;
  });
}) (window, define, require);
