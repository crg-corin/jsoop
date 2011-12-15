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
 * returns the html decoded string
 */
(function () {
    "use strict";
    if (!String.prototype.decodeHTML) {
        String.prototype.decodeHTML = function () {
            if (this === null || this === undefined) {
                throw new TypeError('this is null or not defined');
            }
            return String(this)
                .replace(/&#x2F;/g, '/')
                .replace(/&#x27;/g, "'")
                .replace(/&quot;/g, '"')
                .replace(/&gt;/g, '>')
                .replace(/&lt;/g, '<')
                .replace(/&amp;/g, '&');
        };
    }
}());