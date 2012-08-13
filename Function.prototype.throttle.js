(function (slice) {
    "use strict";
    if (!Function.prototype.throttle) {
        Function.prototype.throttle = function (delay, ret) {
            var fn,
                enabled;
            function enable() {
                enabled = true;
            }
            fn = this;
            enabled = true;
            if (typeof fn !== 'function') {
                throw new Error('Function.prototype.throttle must be called on a function.');
            }
            if (!arguments.length) {
                delay = 1000;
            }
            delay = +delay;
            if (isNaN(delay) || delay < 1) {
                throw new Error('Function.prototype.throttle requires a positive number as a parameter.');
            }
            return function () {
                var args;
                args = slice.call(arguments);
                if (enabled) {
                    enabled = false;
                    setTimeout(enable, delay);
                    return fn.apply(this, args);
                }
                return ret;
            };
        };
    }
}(Array.prototype.slice));