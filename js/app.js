(function (window) {
  'use strict';
  define([], function () {
    if (typeof window.app !== 'object') {
      window.app = {
        model     : {},
        control   : {},
        component : {}
      };
    }
    return window.app;
  });
}) (window);
