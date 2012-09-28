/**
 * @dependencies:
 * Math.abs
 * Math.SQRT2
 * Math.erf
 * 
 * http://www.codeproject.com/Articles/408214/Excel-Function-NORMSDIST-z
 */
(function () {
    "use strict";
    if (!Math.normSDist) {
        Math.normSDist = function (z) {
            var sign,
                ret;
            sign = z < 0 ? -1 : 1;
            ret = Math.abs(z);
            ret /= Math.SQRT2;
            ret = Math.erf(ret);
            ret *= sign;
            ret += 1;
            ret /= 2;
            return ret;
        };
    }
}());