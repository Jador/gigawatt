"use strict";
var ಠ_ಠ = require('./Util.js');
var reserved = ['emit', 'listen', 'getName'];
var createStore = function(definition) {
  var clone = ಠ_ಠ.extend({}, definition);
  clone.actions = pluckActions(clone);
  for (var key in clone.actions) {
    if (reserved.indexOf(key) > -1) {
      continue;
    }
    var handlerName = getHandlerName(key);
    if (ಠ_ಠ.isFunction(clone[handlerName])) {
      clone[handlerName].apply(clone, [clone.actions[key].listen()]);
    }
  }
  return clone;
};
function pluckActions(obj) {
  var actions = {};
  if (ಠ_ಠ.isFunction(obj.actions)) {
    actions[obj.actions.getName()] = obj.actions;
  } else if (ಠ_ಠ.isObject(obj.actions)) {
    actions = obj.actions;
  }
  return actions;
}
function getHandlerName(action) {
  return "handle" + capitalize(action);
}
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports = createStore;
//# sourceURL=createStore.js