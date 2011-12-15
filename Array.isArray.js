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
 * true if arg is an array
 */
(function () {
    "use strict";
    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }
}());