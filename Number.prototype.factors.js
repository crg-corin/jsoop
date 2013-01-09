(function () {
    "use strict";
    if (!Number.prototype.factors) {
        Number.prototype.factors = function (identity) {
            var f,
                i,
                n,
                m,
                s;
            n = +this;
            if (!isFinite(n) || n % 1) {
                return null;
            }
            f = [];
            m = Math.sqrt(n);
            s = 1;
            for (i = identity ? 1 : 2; i <= m; i += s) {
                if (n % i === 0) {
                    console.log(i);
                    f.push(i);
                    if (i !== m) {
                        console.log(n / i);
                        f.push(n / i);
                    }
                } else {
                    s = i;
                    i = 1;
                }
            }
            return f.sort(function (a, b) {
                return a - b;
            });
        };
    }
}());