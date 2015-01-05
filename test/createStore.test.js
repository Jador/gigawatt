var Gigawatt = require('../');

describe('createStore', function() {

  it('should auto dispatch a handle method when provided an action', function() {

    var action = Gigawatt.createAction('event');

    var definition = {
      actions: action,
      handleEvent: function(bus) {
        bus.onValue(function(value) {
          console.log('handleEvent onValue: ', value);
          expect(value).toBe('oop');
        });
      }
    };

    spyOn(definition, 'handleEvent').and.callThrough();
    var Store = Gigawatt.createStore(definition);
    action('oop');
    
    expect(Store.handleEvent).not.toBe(undefined);
    expect(typeof Store.handleEvent).toBe('function');
    expect(Store.handleEvent).toHaveBeenCalled();
  });

  it('should dispatch to all handle methods if actions is an array', function() {
    var actions = Gigawatt.createActions(['alpha', 'omega', 'gamma']);

    var definition = {
      actions: actions,
      handleAlpha: function(bus) {
        console.log('alpha called');
      },
      handleOmega: function(bus) {
        console.log('omega called');
      },
      handleGamma: function(bus) {
        console.log('gamma called');
      }
    };
    
    var methods = [];
    for(key in actions) {
      var action = actions[key].getName();
      methods.push({
        action: action,
        method: 'handle' + action.charAt(0).toUpperCase() + action.slice(1)
      });
    }

    methods.forEach(function(m) {
      spyOn(definition, m.method).and.callThrough();
    });
    
    var Store = Gigawatt.createStore(definition);
    
    methods.forEach(function(m) {
      expect(Store[m.method].calls.count()).toBe(1);
      expect(Store[m.method]).toHaveBeenCalledWith(actions[m.action].listen());
    });
  });
  
});
