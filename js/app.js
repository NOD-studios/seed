(function (window) {
  'use strict';
  define(['env'], function (env) {
    env.JS_NAMESPACE = env.JS_NAMESPACE || 'app';
    if (typeof window[env.JS_NAMESPACE] !== 'object') {
      window[env.JS_NAMESPACE] = {};
    }
    return window[env.JS_NAMESPACE];
  });
}) (window);
