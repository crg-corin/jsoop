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
 * true if arg is a String
 */
(function () {
    "use strict";
    if (!String.isString) {
        String.isString = function (arg) {
            return Object.prototype.toString.call(arg) === '[object String]';
        };
    }
}());