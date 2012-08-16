/**
 * Error
 * RangeError
 * isNaN
 * isFinite
 */
(function () {
    "use strict";
    if (!Array.fill) {
        Array.fill = function (length, val) {
            var ret;
            length = +length;
            if (isNaN(length)) {
                throw Error('"length" must be a Number.');
            }
            if (!isFinite(length)) {
                throw RangeError('"length" must be a finite Number.');
            }
            if (length < 0) {
                throw RangeError('"length" must be greater than or equal to zero (0).');
            }
            ret = [];
            ret.length = length;
            while (length--) {
                ret[length] = val;
            }
            return ret;
        };
    }
}());