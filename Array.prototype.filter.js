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
    var isFunction;
    isFunction = Function.isFunction || function (arg) {
        return Object.prototype.toString.call(arg) === '[object Function]';
    };
    if (!Array.prototype.filter) {
        Array.prototype.filter = function (callback, context) {
            var i,
                ii,
                len,
                res,
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
            res = [];
            for (i = 0; i < len; i += 1) { //for..in?
                if (i in t) {
                    //in case callback mutates any values
                    ii = i;
                    val = t[i];
                    if (callback.call(context, val, ii, t)) {
                        res.push(t[i]);
                    }
                }
            }
            return res;
        };
    }
}());