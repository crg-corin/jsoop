/**
 * @dependencies
 * Object.prototype.toString
 * Function.prototype.call
 * 
 * @dependents
 * 
 * @param arg
 * An object or value to test
 * 
 * @return Boolean
 * true if arg is a Date
 */
(function () {
    "use strict";
    if (!Date.isDate) {
        Date.isDate = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Date]';
        };
    }
}());