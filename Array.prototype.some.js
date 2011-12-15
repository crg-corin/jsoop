/*jslint bitwise: true */
/**
 * @dependencies
 * Object
 * Object.prototype.hasOwnProperty
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
 * return true if the element passed the test
 * 
 * @param context
 * the context in which `callback` should be called (will be `this` within `callback`)
 * 
 * @return boolean
 * true if any elements in the array pass the test implemented by `callback`
 */
(function () {
    "use strict";
    var isFunction;
    isFunction = Function.isFunction || function (arg) {
        return Object.prototype.toString.call(arg) === '[object Function]';
    };
    if (!Array.prototype.some) {
        Array.prototype.some = function (callback, context) {
            var i,
                ii,
                len,
                t,
                val;
            if (this === null || this === undefined) {
                throw new TypeError('this is null or not defined');
            }
            if (!isFunction(callback)) {
                throw new TypeError('callback is not a function');
            }
            t = Object(this);
            len = t.length >>> 0;
            for (i = 0; i < len; i += 1) {
                if (t.hasOwnProperty(i)) {
                    //in case callback mutates any values
                    ii = i;
                    val = t[i];
                    if (callback.call(context, val, ii, t)) {
                        return true;
                    }
                }
            }
            return false;
        };
    }
}());