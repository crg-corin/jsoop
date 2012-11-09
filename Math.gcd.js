(function (slice) {
    "use strict";
    ///finds the greatest common denominator of two arguments
    ///http://stackoverflow.com/a/4652513/497418
    function gcd(a, b) {
        a = +a;
        b = +b;
        if (isNaN(a) || isNaN(b)) {
            return NaN;
        }
        return b ? gcd(b, a%b) : a;
    }
    
    if (!Math.gcd) {
        Math.gcd = function (/*arg1, arg2, arg3, ...*/) {
            var args;
            switch (arguments.length) {
            case 0:
                return 0;
            case 1:
                return +arguments[0];
            }
            args = slice.call(arguments);
            return args.reduce(function (a, b) {
                return gcd(a, b);
            });
        };
    }
}(Array.prototype.slice));