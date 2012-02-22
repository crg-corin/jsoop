/*jslint bitwise: true */
/**
 * @dependencies
 * Object
 * Object.prototype.toString
 * Function.prototype.call
 * Function.isFunction
 * TypeError
 * Array
 * Array.prototype.push
 * 
 * @dependents
 * 
 * @param callback
 * the callback used durring array iteration
 * function (value, index, array)
 * return the mapped value for this index
 * 
 * @param context
 * the context in which `callback` should be called (will be `this` within `callback`)
 * 
 * @return Array
 * The new array with the results of calling `callback` on every element in this array
 */
(function () {
    "use strict";
    var isFunction;
    isFunction = Function.isFunction || function (arg) {
        return Object.prototype.toString.call(arg) === '[object Function]';
    };
    if (!Array.prototype.map) {
        Array.prototype.map = function (callback, context) {
            var i,
                ii,
                len,
                ret,
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
            ret = [];
            for (i = 0; i < len; i += 1) {
                if (i in t) {
                    //in case callback mutates any values
                    ii = i;
                    val = t[i];
                    ret.push(callback.call(context, val, ii, t));
                }
            }
            return ret;
        };
    }
}());