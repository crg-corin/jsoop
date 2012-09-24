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
 * function (previousValue, currentValue, index, array)
 *
 * @param init
 * the initial value to use for the first call of `callback`
 * 
 * @return *
 * the reduced value from recursive calls to `callback`
 */
(function () {
    "use strict";
    if (!Array.prototype.reduce) {
        Array.prototype.reduce = function (callback, init) {
            var a,
                c,
                i,
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
            a = arguments.length <= 1;
            if (len === 0 && a) {
                throw new TypeError('array length is 0 and no initial value was provided');
            }
            for (i = a ? 1 : 0, c = a ? t[0] : init; i < len; i += 1) {
                if (i in t) {
                    val = t[i];
                    c = callback.call(undefined, c, val, i, t);
                }
            }
            return c;
        };
    }
}());