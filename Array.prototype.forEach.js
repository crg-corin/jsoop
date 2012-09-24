/*jslint bitwise: true */
/**
 * @dependencies
 * Object
 * Object.prototype.toString
 * Function.prototype.call
 * Function.isFunction
 * TypeError
 * 
 * @dependents
 * 
 * @param callback
 * the callback used durring array iteration
 * function (value, index, array)
 * NOTE: returning `false` will _not_ act as a `break` statement
 * 
 * @param context
 * the context in which `callback` should be called (will be `this` within `callback`)
 * 
 * @return undefined
 */
(function () {
    "use strict";
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (callback, context) {
            var i,
                len,
                t,
                val;
            if (this === null || this === undefined) {
                throw new TypeError('this is null or not defined');
            }
            if (!Function.isFunction(callback)) {
                throw new TypeError('callback is not a function');
            }
            t = Object(this);
            len = t.length >>> 0;
            for (i = 0; i < len; i += 1) {
                if (i in t) {
                    val = t[i];
                    callback.call(context, val, i, t);
                }
            }
        };
    }
}());