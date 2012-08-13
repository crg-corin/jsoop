(function (slice) {
    "use strict";
    if (!Function.prototype.repeat) {
        Function.prototype.repeat = function (delay) {
            var fn;
            fn = this;
            if (typeof fn !== 'function') {
                throw new Error('Function.prototype.repeat must be called on a function.');
            }
            if (!arguments.length) {
                delay = 1000;
            }
            delay = +delay;
            if (isNaN(delay) || delay < 1) {
                throw new Error('Function.prototype.repeat requires a positive number as a parameter.');
            }
            return function () {
                var args,
                    self,
                    interval;
                args = slice.call(arguments);
                self = this;
                interval = setInterval(function () {
                    fn.apply(self, args);
                }, delay);
                //return the cancel function;
                return function () {
                    clearInterval(interval);
                };
            };
        };
    }
}(Array.prototype.slice));