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
    if (!Function.prototype.curry) {
        Function.prototype.curry = function () {
            var args,
                self;
            self = this;
            args = Array.prototype.slice.call(arguments);
            return function () {
                return self.apply(this, args.concat(
                    Array.prototype.slice.call(arguments)
                ));
            };
        };
    }
}());