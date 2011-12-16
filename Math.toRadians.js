/**
 * @dependencies
 * 
 * @dependents
 * 
 * @param deg
 * the degree value to convert into radians
 * 
 * @return Number
 * the radian equivalent of the degree value
 */
(function () {
    "use strict";
    if (!Math.toRadians) {
        Math.toRadians = function (deg) {
            return deg * 0.017453292519943295;
        };
    }
}());