var Bus = require('baconjs').Bus;

function Action() {
  var bus = new Bus();
  
  var functor = function() {
    functor.emit.apply(functor, arguments);
  };

  functor.listen = () => bus;
  functor.emit = (payload) => bus.push(payload);

  return functor;
}

var createAction = function(actionName) {
  var obj = {};
  [].concat(actionName).forEach(name => obj[name] = new Action());
  return obj;
};

module.exports = createAction;
