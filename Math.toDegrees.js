/**
 * @dependencies
 * 
 * @dependents
 * 
 * @param rad
 * a radian value to convert to degrees
 * 
 * @return Number
 * the degrees equivalent of the radian value
 */
(function () {
    "use strict";
    if (!Math.toDegrees) {
        Math.toDegrees = function (rad) {
            return rad * 57.29577951308232;
        };
    }
}());