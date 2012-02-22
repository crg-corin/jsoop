/**
 * @dependencies
 * Array.prototype.slice
 * Function.prototype.call
 * 
 * @dependents
 * 
 * @param
 * 
 * @return Function
 * returns the curried function with the provided arguments pre-populated
 */
(function () {
    "use strict";
    if (!Function.prototype.partial) {
        Function.prototype.partial = function () {
            var fn,
                argmts;
            fn = this;
            argmts = arguments;
            return function () {
                var arg,
                    i,
                    args;
                args = Array.prototype.slice.call(argmts);
                for (i = arg = 0; i < args.length && arg < arguments.length; i++) {
                    if (typeof args[i] === 'undefined') {
                        args[i] = arguments[arg++];
                    }
                }
                return fn.apply(this, args);
            };
        };
    }
}());