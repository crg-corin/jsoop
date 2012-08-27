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
(function (ots) {
    "use strict";
    if (!Function.isFunction) {
        Function.isFunction = function (arg) {
            return ots.call(arg) === '[object Function]';
        };
    }
}(Object.prototype.toString));