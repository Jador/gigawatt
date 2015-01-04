var Gigawatt = require('../');

describe('test of createAction', function() {

  it('should create object with property "bob"', function() {
    var x = Gigawatt.createAction('bob');
    expect(x.hasOwnProperty('bob')).toBe(true);
  });

  it('should be a function', function() {
    expect(typeof Gigawatt.createAction('bob').bob).toBe('function');
  });

  it('should create multiple properties when given an array', function() {
    var actions = ['alpha', 'omega', 'gamma'];
    var x = Gigawatt.createAction(actions);
    actions.forEach(function(action) {
      expect(x.hasOwnProperty(action)).toBe(true);
    });
  });
  
  it('should push events on to the stream properly', function(done) {
    var x = Gigawatt.createAction('bob');
    var i = 0;

    var int = setInterval(function() {
      x.bob(i++);
      if(i > 3) {
        stop();
      }
    }, 500);

    x.bob.listen().onValue(function(value) {
      expect(value).not.toBeNull();
      console.log("listen value: ", value);
    });

    function stop() {
      clearInterval(int);
      done();
    }
  });
  
});
