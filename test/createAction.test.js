var Gigawatt = require('../');

describe('createAction', function() {

  it('should create a single action when given a string', function() {
    expect(typeof Gigawatt.createAction('bob')).toBe('function');
  });

  it('should have the name provided to the factory method', function() {
    expect(Gigawatt.createAction('bob').getName()).toBe('bob');
  });

  it('should create an object when given an array', function() {
    var actions = ['alpha', 'omega', 'gamma'];
    expect(typeof Gigawatt.createAction(actions)).toBe('object');
  });

  it('should have actions(properties) for each string in the array', function() {
    var actionNames = ['alpha', 'omega', 'gamma'];
    var actions = Gigawatt.createAction(actionNames);
    actionNames.forEach(function(name) {
      expect(actions.hasOwnProperty(name)).toBe(true);
    });
  });
  
  it('should push events on to the stream properly', function(done) {
    var x = Gigawatt.createAction('bob');
    var i = 0;

    var int = setInterval(function() {
      x(i++);
      if(i > 3) {
        stop();
      }
    }, 500);

    x.listen().onValue(function(value) {
      expect(value).not.toBeNull();
      console.log("listen value: ", value);
    });

    function stop() {
      clearInterval(int);
      done();
    }
  });
  
});
