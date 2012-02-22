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
 * true if arg is an Error
 */
(function () {
    "use strict";
    if (!Error.isError) {
        Error.isError = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Error]';
        };
    }
}());