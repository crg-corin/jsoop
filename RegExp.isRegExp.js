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
 * true if arg is a RegExp
 */
(function () {
    "use strict";
    if (!RegExp.isRegExp) {
        RegExp.isRegExp = function (arg) {
            return Object.prototype.toString.call(arg) === '[object RegExp]';
        };
    }
}());