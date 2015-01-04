var Bus = require('baconjs').Bus;

function Action(name) {
  var bus = new Bus();

  var functor = function() {
    functor.emit.apply(functor, arguments);
  };

  functor.getName = () => name;
  functor.listen = () => bus;
  functor.emit = (payload) => bus.push(payload);

  return functor;
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
