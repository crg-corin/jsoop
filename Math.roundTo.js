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
    if (!Math.roundTo) {
        Math.roundTo = function (num, exp) {
            var a,
                fixedLength,
                rounded;
            exp = Number(exp);
            if (isNaN(exp)) {
                throw new RangeError('exponent is not a number');
            }
            if (!isFinite(exp)) {
                throw new RangeError('exponent is not a fininte number');
            }
            a = Math.pow(10, exp);
            num = Number(num);
            rounded = Math.round(num / a) * a;
            fixedLength = exp < 0 ? -exp : 0;
            return Number(rounded.toFixed(fixedLength));
        };
    }
}());