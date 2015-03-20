WrappedMethods = {};

MethodWatcher = {};

var createWrapper = function(func, ms, limit){
  var callNumber = 0;
  var time = 0;
  return function(){

    var now = Date.now();
    var args = arguments;

    if ( now-time > ms ){
      callNumber = 1;
      time = now;
    } else {
      callNumber++;
    }

    if ( callNumber > limit){
      throw new Meteor.Error('maximum-call-number-exceeded');
    }

    return func.apply(undefined, args);
  }
};

/**
 * @param methodName name of the affected method
 * @param config options
 *    config.limit how many times this method can be called in a timeframe
 *    config.frame timeframe
 */
MethodWatcher.limit = function(methodName, config){
  WrappedMethods[ methodName ] = function(func){
    return createWrapper(func, config.frame, config.limit);
  };
};
