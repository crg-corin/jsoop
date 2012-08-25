(function (slice) {
    "use strict";
    if (!Function.prototype.once) {
        Function.prototype.once = function (n, ret) {
            var fn;
            fn = this;
            if (typeof fn !== 'function') {
                throw new Error('"Function.prototype.once" must be called on a function.');
            }
            if (!arguments.length) {
                n = 1;
            }
            n = +n;
            if (isNaN(n) || n < 1) {
                throw new Error('"Function.prototype.once" requires a positive number as a parameter.');
            }
            return function () {
                var args;
                args = slice.call(arguments);
                if (n-- > 0) {
                    return fn.apply(this, args);
                }
                return ret;
            };
        };
    }
}(Array.prototype.slice));