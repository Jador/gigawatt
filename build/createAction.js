"use strict";
var Bus = require('baconjs').Bus;
function Action(name) {
  var bus = new Bus();
  var functor = function() {
    functor.emit.apply(functor, arguments);
  };
  functor.getName = (function() {
    return name;
  });
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
  [].concat(actionName).forEach((function(action) {
    return obj[action] = new Action(action);
  }));
  if (Object.keys(obj).length === 1) {
    return obj[actionName];
  } else {
    return obj;
  }
};
module.exports = createAction;
//# sourceURL=createAction.js