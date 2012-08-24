/**
 * @dependencies
 * 
 * @dependents
 * 
 * @param
 * 
 * @return
 */
(function (isFinite) {
    "use strict";
    if (!Number.prototype.isFinite) {
        Number.prototype.isFinite = function () {
            return isFinite(this);
        };
    }
}(window.isFinite));