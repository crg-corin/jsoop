/**
 * @dependencies
 * 
 * @dependents
 * 
 * @param
 * 
 * @return
 */
(function () {
    "use strict";
    if (!Number.prototype.bound) {
        Number.prototype.bound = function (min, max) {
            var t;
            if (this === null || this === undefined) {
                throw new TypeError('this is null or not defined');
            }
            min = +min;
            max = +max;
            t = +this;
            return Math.min(Math.max(t, min), max);
        };
    }
}());