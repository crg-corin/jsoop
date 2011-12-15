/**
 * @dependencies
 * Date
 * 
 * @dependents
 * 
 * @param
 * 
 * @return Number
 * the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC
 */
(function () {
    "use strict";
    if (!Date.now) {
        Date.now = function () {
            return +new Date();
        };
    }
}());