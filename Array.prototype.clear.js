(function () {
    "use strict";
    if (!Array.prototype.clear) {
        Array.prototype.clear = function () {
            while (this.length) {
                this.pop();
            }
            return this;
        };
    }
}());