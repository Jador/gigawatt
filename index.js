var actionFactory = require('./build/createAction.js');

var Gigawatt = {
  createAction: actionFactory.createAction,
  createActions: actionFactory.createActions,
  createStore: require('./build/createStore.js')
};

module.exports = Gigawatt;
