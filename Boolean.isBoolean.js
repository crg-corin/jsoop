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
 * true if arg is a Boolean
 */
(function () {
    "use strict";
    if (!Boolean.isBoolean) {
        Boolean.isBoolean = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Boolean]';
        };
    }
}());