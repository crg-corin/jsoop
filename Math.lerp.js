(function () {
    "use strict";
    if (!Math.lerp) {
        Math.lerp = function (a, b, n) {
            a = +a;
            b = +b;
            n = +n;
            return (b - a) * n + a;
        };
    }
}());