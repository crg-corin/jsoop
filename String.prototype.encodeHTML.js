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
 * returns the html encoded string
 */
(function () {
    "use strict";
    if (!String.prototype.encodeHTML) {
        String.prototype.encodeHTML = function () {
            if (this === null || this === undefined) {
                throw new TypeError('this is null or not defined');
            }
            return String(this)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#x27;')
                .replace(/\//g, '&#x2F;');
        };
    }
}());