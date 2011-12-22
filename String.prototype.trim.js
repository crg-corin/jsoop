/**
 * @dependencies
 * String
 * String.prototype.replace
 * TypeError
 * 
 * @dependents
 * 
 * @param
 * 
 * @return String
 * returns a string with all whitespace removed from the beginning or end
 */
(function () {
    "use strict";
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            if (this === null || this === undefined) {
                throw new TypeError('this is null or not defined');
            }
            return String(this).replace(/^\s+|\s+$/g, '');
        };
    }
}());