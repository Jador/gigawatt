"use strict";
var Bus = require('baconjs').Bus;
function Action(name) {
  var bus = new Bus();
  var action = function() {
    action.emit.apply(action, arguments);
  };
  action.getName = (function() {
    return name;
  });
  action.listen = (function() {
    return bus;
  });
  action.emit = (function(payload) {
    return bus.push(payload);
  });
  return action;
}
exports.createAction = function(actionName) {
  return new Action(actionName);
};
exports.createActions = function(actionNames) {
  var actions = {};
  [].concat(actionNames).forEach((function(actionName) {
    return actions[actionName] = new Action(actionName);
  }));
  return actions;
};
//# sourceURL=createAction.js