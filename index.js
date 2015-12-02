var _assign = Object.assign;
var keys = Object.keys;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var defineProperties = Object.defineProperties;
var create = Object.create;
var slice = Array.prototype.slice;

_assign(exports, {
  cacheDescriptor,
  assign
});

// Returns a function used to create a descriptor
function cacheDescriptor(descriptor, multi) {
  descriptor = _assign(create(null), descriptor);

  if (multi) {
    return function describe(object) {
      var target = create(null);
      Object.keys(object).forEach(key => {
        target[key] = create(descriptor);
        target[key].value = object[key];
      });
      return target;
    };
  }

  return function describe(value) {
    descriptor.value = value;
    return descriptor;
  };
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
function assign(target) {
  slice.call(arguments, 1).forEach(source => {
    defineProperties(target, keys(source).reduce((descriptors, key) => {
      descriptors[key] = getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {}));
  });

  return target;
}
