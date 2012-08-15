(function () {
    "use strict";
    if (!Math.truncate) {
        Math.truncate = function (n) {
            n = +n;
            return Math[n < 0 ? 'ceil' : 'floor'](n);
        };
    }
}());