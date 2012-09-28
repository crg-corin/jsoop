/**
 * @dependencies
 * Math.abs
 * Math.exp
 * 
 * http://www.codeproject.com/Articles/408214/Excel-Function-NORMSDIST-z
 */
(function () {
    "use strict"
    var a1,
        a2,
        a3,
        a4,
        a5,
        p;
    a1 = 0.254829592;
    a2 = -0.284496736;
    a3 = 1.421413741;
    a4 = -1.453152027;
    a5 = 1.061405429;
    p = 0.3275911;
    if (!Math.erf) {
        Math.erf = function (x) {
            var t,
                ret;
            x = Math.abs(x);
            t = 1 / (1 + p * x);
            ret = a5;
            ret *= t;
            ret += a4;
            ret *= t;
            ret += a3;
            ret *= t;
            ret += a2;
            ret *= t;
            ret += a1;
            ret *= t;
            ret *= Math.exp(-1 * x * x);
            ret = 1 - ret;
            return ret;
        };
    }
}());