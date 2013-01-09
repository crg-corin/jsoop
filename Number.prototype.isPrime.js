(function () {
    "use strict";
    if (!Number.prototype.isPrime) {
        Number.prototype.isPrime = function () {
            var i,
                m,
                n;
            n = +this;
            if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) {
                return false;
            }
            if (n % 2 === 0) {
                return n === 2;
            }
            if (n % 3 === 0) {
                return n === 3;
            }
            m = Math.sqrt(n);
            for (i = 5; i <= m; i += 6) {
                if ((n % i === 0) || (n % (i + 2) === 0)) {
                    return false;
                }
            }
            return true;
        };
    }
}());