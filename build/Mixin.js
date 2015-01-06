"use strict";
var Mixin = function(bindings) {
  var mixin = {};
  var unsubscribes = {};
  mixin.componentDidMount = function() {
    var $__0 = this;
    bindings.forEach((function(binding) {
      binding.props.forEach((function(prop) {
        unsubscribes[prop] = binding.store[prop].onValue((function(value) {
          return $__0.setState(value);
        }));
      }));
    }));
  };
  mixin.componentWillUnmount = function() {
    bindings.forEach((function(binding) {
      return binding.props.forEach((function(prop) {
        return unsubscribes[prop]();
      }));
    }));
  };
  return mixin;
};
module.exports = Mixin;
//# sourceURL=Mixin.js