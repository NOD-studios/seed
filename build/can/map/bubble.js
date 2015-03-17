define(["can/util/library","can/bubble"],function(e){var n=e.bubble;return e.extend({},n,{childrenOf:function(e,t){e._nestedReference?e._nestedReference.each(function(c,r){c&&c.bind&&n.toParent(c,e,r(),t)}):n._each.apply(this,arguments)}})});
//# sourceMappingURL=bubble.js
//# sourceMappingURL=bubble.js.map