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
 * returns a string with all whitespace removed from the end
 */
(function () {
    "use strict";
    if (!String.prototype.trimRight) {
        String.prototype.trimRight = function () {
            if (this === null || this === undefined) {
                throw new TypeError('this is null or not defined');
            }
            return String(this).replace(/\s+$/g, '');
        };
    }
}());