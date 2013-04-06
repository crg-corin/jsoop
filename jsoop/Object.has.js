(function (root, has, undefined) {
    "use strict";
    if (!Object.has) {
        Object.has = function (obj, prop) {
            if (obj === null ||
                obj === undefined ||
                prop === null ||
                prop === undefined) {
                return false;
            }
            return has.call(obj, prop);
        };
    }
}(this, this.Object.prototype.hasOwnProperty));