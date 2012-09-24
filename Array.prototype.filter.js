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
 * the callback used to filter the array
 * function (value, index, array)
 * return true for elements that pass the test
 * 
 * @param context
 * the context in which `callback` should be called (will be `this` within `callback`)
 * 
 * @return Array
 * The new array with all elements that pass the test implemented by `callback`
 */
(function () {
    "use strict";
    if (!Array.prototype.filter) {
        Array.prototype.filter = function (callback, context) {
            var i,
                len,
                res,
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
            res = [];
            for (i = 0; i < len; i += 1) { //for..in?
                if (i in t) {
                    val = t[i];
                    if (callback.call(context, val, i, t)) {
                        res.push(t[i]);
                    }
                }
            }
            return res;
        };
    }
}());