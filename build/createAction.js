"use strict";
var Bus = require('baconjs').Bus;
function Action() {
  var bus = new Bus();
  var functor = function() {
    functor.emit.apply(functor, arguments);
  };
  functor.listen = (function() {
    return bus;
  });
  functor.emit = (function(payload) {
    return bus.push(payload);
  });
  return functor;
}
var createAction = function(actionName) {
  var obj = {};
  [].concat(actionName).forEach((function(name) {
    return obj[name] = new Action();
  }));
  return obj;
};
module.exports = createAction;
//# sourceURL=createAction.js