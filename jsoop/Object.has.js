(function (root, has, undefined) {
    "use strict";
    if (!Object.has) {
        Object.has = function (obj, prop) {
            if (obj === null || obj === undefined) {
                return false;
            }
            return has.call(obj, prop);
        };
    }
}(this, this.Object.prototype.hasOwnProperty));