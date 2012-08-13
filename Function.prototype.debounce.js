(function () {
    "use strict";
    if (!Function.prototype.debounce) {
        Function.prototype.debounce = function (threshold, immediate) {
            var fn,
                timeout;
            fn = this;
            timeout = null;
            immediate = !!immediate;
            threshold = +threshold;
            if (typeof fn !== 'function') {
                throw new Error('Function.prototype.debounce must be called on a function.');
            }
            if (!isFinite(threshold) || threshold < 1) {
                throw new Error('The debouncing threshold must be a finite number greater than zero (0).');
            }
            return function () {
                var ctxt,
                    args;
                function go() {
                    if (!immediate) {
                        fn.apply(ctxt, args);
                    }
                    timeout = null;
                }
                ctxt = this;
                args = Array.prototype.slice.call(args);
                if (timeout) {
                    clearTimeout(timeout);
                } else if (immediate) {
                    fn.apply(ctxt, args);
                }
                timeout = setTimeout(go, threshold);
            };
        };
    }
}());