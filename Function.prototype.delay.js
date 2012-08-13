(function (slice) {
    "use strict";
    if (!Function.prototype.delay) {
        Function.prototype.delay = function (delay) {
            var fn;
            fn = this;
            if (typeof fn !== 'function') {
                throw new Error('Function.prototype.delay must be called on a function.');
            }
            if (!arguments.length) {
                delay = 1000;
            }
            delay = +delay;
            if (isNaN(delay) || delay < 1) {
                throw new Error('Function.prototype.delay requires a positive number as a parameter.');
            }
            return function () {
                var args,
                    self,
                    t;
                args = slice.call(arguments);
                self = this;
                t = setTimeout(function () {
                    fn.apply(self, args);
                }, delay);
                //return the cancel function;
                return function () {
                    clearTimeout(t);
                };
            };
        };
    }
}(Array.prototype.slice));