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
    if (!Number.prototype.isFinite) {
        Number.prototype.isFinite = function () {
            var t;
            if (this === null || this === undefined) {
                throw new TypeError('this is null or not defined');
            }
            t = Number(this);
            if (isNaN(t)) {
                return false;
            }
            if (t === Number.POSITIVE_INFINITY || t === Number.NEGATIVE_INFINITY) {
                return false;
            }
            return true;
        };
    }
}());