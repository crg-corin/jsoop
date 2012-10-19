(function (slice, undefined) {
    "use strict";
    if (!Function.prototype.loop) {
        Function.prototype.loop = function (c) {
            var condition,
                count,
                fn,
                i;
            fn = this;
            if (typeof fn !== 'function') {
                throw new Error('"Function.prototype.loop" must be called on a function.');
            }
            if (c === undefined) {
                c = Infinity;
            }
            if (typeof c === 'function') {
                condition = c;
            } else {
                count = +c;
                if (isNaN(count)) {
                    throw new Error('"Function.prototype.loop" requires a Function or Number as a parameter.');
                }
                if (count < 1) {
                    throw new RangeError('"count" must be greater than or equal to one (1).');
                }
                condition = function () {
                    return i < count;
                };
            }
            
            return function () {
                var args,
                    i;
                args = slice.call(arguments);
                i = 0;
                while (condition.apply(this, args)) {
                    fn.apply(this, args);
                }
            };
        };
    }
}(Array.prototype.slice));