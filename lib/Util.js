exports.extend = function(dest) {

  for(var i = 1; i < arguments.length; i++) {
    var src = arguments[i];
    for(var prop in src) {
      dest[prop] = src[prop];
    }
  }

  return dest;
};

exports.isObject = function(obj) {
  return typeof obj === 'object';
};

exports.isFunction = function(f) {
  return typeof f === 'function';
};
