/**
 * Requires:
 *  - Array
 *  - Array.toArray
 *  - Array.isArray
 *  - TypeError
 *  - Error
 *  - Function.isFunction
 *  - Array.prototype.sort
 *  - Function.prototype.call
 */
(function () {
    "use strict";
    if (!Array.prototype.multiSort) {
        Array.prototype.multiSort = function (/* sortFn1, sortFn2 */) {
            var sortFns;
            sortFns = Array.toArray(arguments);
            if (!Array.isArray(this)) {
                throw new TypeError('"Array.prototype.multiSort" must be called on an Array.');
            }
            if (!sortFns.every(Function.isFunction)) {
                throw new Error('"Array.prototype.multiSort" can only take functions as parameters.');
            }
            return this.sort(function (a, b) {
                var i,
                    fn,
                    res;
                for (i = 0; i < sortFns.length; i += 1) {
                    fn = sortFns[i];
                    res = fn.call(this, a, b);
                    if (res < 0 || res > 0) {
                        return res;
                    }
                }
                return 0;
            });
        };
    }
}());