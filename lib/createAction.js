var Bus = require('baconjs').Bus;

function Action(name) {
  var bus = new Bus();

  var action = function() {
    action.emit.apply(action, arguments);
  };

  action.getName = () => name;
  action.listen = () => bus;
  action.emit = (payload) => bus.push(payload);

  return action;
}

exports. createAction = function(actionName) {
  return new Action(actionName);
};

exports.createActions = function(actionNames) {
  var actions = {};
  [].concat(actionNames).forEach(actionName => actions[actionName] = new Action(actionName));
  return actions;
};
