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

var createAction = function(actionName) {
  var obj = {};
  [].concat(actionName).forEach(action => obj[action] = new Action(action));
  if(Object.keys(obj).length === 1) {
    return obj[actionName];
  }
  else {
    return obj;
  }
};

module.exports = createAction;
