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
 * true if arg is a Number
 */
(function () {
    "use strict";
    if (!Number.isNumber) {
        Number.isNumber = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Number]';
        };
    }
}());