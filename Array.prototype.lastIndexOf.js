/*jslint bitwise: true */
/**
 * @dependencies
 * Object
 * TypeError
 * Math.abs
 * Math.floor
 * Math.min
 * 
 * @dependents
 * 
 * @param search
 * the value to search for within this array
 * 
 * @param from
 * the index at which to begin searching backwards, defaults to array's length
 * if `from` is greater than or equal to the length of the array, the whole array will be searched
 * if negative, it is taken as the offset from the end of the array
 * 
 * @return Number
 * the index at which `search` was found, or -1 if `search` was not found in this array
 */
(function () {
    "use strict";
    if (!Array.prototype.lastIndexOf) {
        Array.prototype.lastIndexOf = function (search, from) {
            var i,
                len,
                n,
                t;
            if (this === null || this === undefined) {
                throw new TypeError('this is null or not defined');
            }
            t = Object(this);
            len = t.length >>> 0;
            if (!len) {
                return -1;
            }
            n = len;
            if (arguments.length > 1) {
                n = +from || 0;
                if (n !== 0 && n !== Infinity && n !== -Infinity) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            for (i = n < 0 ? len + n : Math.min(n, len - 1); i >= 0; i -= 1) {
                if (i in t && t[i] === search) {
                    return i;
                }
            }
            return -1;
        };
    }
}());