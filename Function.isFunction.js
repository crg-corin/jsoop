/**
 * @dependencies
 * Object.prototype.toString
 * Function.prototype.call
 * 
 * @dependents
 * Array.prototype.filter
 * Array.prototype.forEach
 * Array.prototype.every
 * Array.prototype.map
 * Array.prototype.some
 * Array.prototype.reduce
 * Array.prototype.reduceRight
 * 
 * @param arg
 * An object or value to test
 * 
 * @return Boolean
 * true if arg is a Function
 */
(function () {
    "use strict";
    if (!Function.isFunction) {
        Function.isFunction = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Function]';
        };
    }
}());