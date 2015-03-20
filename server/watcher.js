// code is based on easy-security
// https://github.com/matteodem/meteor-easy-security

// keep track of connections by ip address
var connections = {};
var calls = {};

// register incoming connections
Meteor.server.onConnection(function (conn) {
  connections[conn.clientAddress] = conn;
});

// on startup wrap exiting methods
Meteor.startup(function () {
  var _methods = Meteor.methods;

  function createWrappedMethod(name, func) {
    if ( name in WrappedMethods ){
      return WrappedMethods[name].call(undefined, func);
    }
    return func;
  }

  function wrapMethods(methods) {
    var name;
    for (name in methods) {
      methods[name] = createWrappedMethod(name, methods[name]);
    }
    return methods;
  }

  // Rewrite current registered methods and methods function
  Meteor.server.method_handlers = wrapMethods(Meteor.server.method_handlers);

  Meteor.methods = function (methods) {
    return _methods.apply(this, [wrapMethods(methods)]);
  };
});
