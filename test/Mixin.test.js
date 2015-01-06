var ಠ_ಠ = require('../build/Util.js');
var Gigawatt = require('../');

describe('Mixin', function() {

  var stub, foo, store;

  beforeEach(function() {
    stub = {
      state: undefined,
      setState: function(state) {
        console.log('setState called', state);
        this.state = state;
      }
    };

    foo = Gigawatt.createAction('foo');
    
    store = {
      prop1: foo.listen().toProperty('a') 
    };
  });
  
  it('should auto bind to props on a Store', function() {
    var component = ಠ_ಠ.extend(stub, Gigawatt.Mixin([{ store: store, props: ['prop1'] }]));
    expect(component.state).toBe(undefined);

    component.componentDidMount();
    expect(component.state).toBe('a');
    
    foo('bar');
    expect(component.state).toBe('bar');
  });

  it('should bind to all specified props', function() {

    var bar = Gigawatt.createAction('bar');
    var baz = Gigawatt.createAction('baz');
    
    var store2 = {
      prop1: baz.listen().toProperty(),
      prop2: bar.listen().toProperty()
    };
    
    var component = ಠ_ಠ.extend(stub, Gigawatt.Mixin([
      { store: store, props: ['prop1'] },
      { store: store2, props: ['prop1', 'prop2'] }
    ]));
    
    expect(component.state).toBe(undefined);

    component.componentDidMount();
    expect(component.state).toBe('a');
    
    foo('bar');
    expect(component.state).toBe('bar');

    bar('baz');
    expect(component.state).toBe('baz');
    
    baz('foo');
    expect(component.state).toBe('foo');

  });
  
});
