var actionFactory = require('./build/createAction.js');

var Gigawatt = {
  createAction: actionFactory.createAction,
  createActions: actionFactory.createActions,
  createStore: require('./build/createStore.js'),
  Mixin: require('./build/Mixin.js')
};

module.exports = Gigawatt;
