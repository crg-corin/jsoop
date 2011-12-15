/**
 * @dependencies
 * Number
 * String
 * TypeError
 * 
 * @dependents
 * 
 * @param min
 * The lower bound to test against
 * 
 * @param max
 * The upper bound to test against
 * 
 * @param bounds
 * a string specifying whether to include the upper bound, lower bound, both, or none
 * 'upper', 'lower', 'both', 'none'
 * defaults to 'none'
 * 
 * @return Boolean
 * true if the number is between the provided bounds
 */
(function () {
    "use strict";
    if (!Number.prototype.between) {
        Number.prototype.between = function (min, max, bounds) {
            var t;
            if (this === null || this === undefined) {
                throw new TypeError('this is null or not defined');
            }
            t = Number(this);
            min = Number(min);
            max = Number(max);
            switch (String(bounds)) {
                case 'lower':
                    return t >= min && t < max;
                case 'upper':
                    return t > min && t <= max;
                case 'both':
                    return t >= min && t <= max;
                case 'none':
                default:
                    return t > min && t < max;
            }
        };
    }
}());