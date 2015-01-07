var Mixin = function(bindings) {
  var mixin = {};
  var unsubscribes = {};

  mixin.componentDidMount = function() {
    bindings.forEach(binding => {
      binding.props.forEach(prop => {
        unsubscribes[prop] = binding.store[prop].onValue(value => this.setState(value));
      });
    });
  };

  mixin.componentWillUnmount = function() {
    bindings.forEach(binding => binding.props.forEach(prop => unsubscribes[prop]()));
  };
  
  return mixin;
};

module.exports = Mixin;
