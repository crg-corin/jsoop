(function () {
    "use strict";
    if (!Array.range) {
        //Array.range(5) === [0, 1, 2, 3, 4, 5]
        //Array.range(0, 5) === [0, 1, 2, 3, 4, 5]
        //Array.range(0, 5, 1) === [0, 1, 2, 3, 4, 5]
        //Array.range(0, 5, -1) === [5, 4, 3, 2, 1, 0]
        //Array.range(5, 0) === [5, 4, 3, 2, 1, 0]
        //Array.range(5, 0, -1) === [0, 1, 2, 3, 4, 5]
        Array.range = function (start, end, increment) {
            var swap,
                ret,
                i;
            ret = [];
            switch (arguments.length) {
            case 0:
                return ret;
            case 1:
                end = start;
                start = 0;
                //no break
            case 2:
                increment = 1;
                break;
            }
            
            start = +start;
            end = +end;
            increment = +increment;
            
            if (!isFinite(start)) {
                throw new RangeError('"start" must be finite.');
            } else if (!isFinite(end)) {
                throw new RangeError('"end" must be finite.');
            } else if (!isFinite(increment)) {
                throw new RangeError('"increment" must be finite.');
            } else if (!increment) {
                throw new RangeError('"increment" may not be 0.');
            }
            
            if (increment < 0) {
                swap = start;
                start = end;
                end = swap;
                increment = -increment;
            }
            
            if (start <= end) {
                for (i = start; i <= end; i += increment) {
                    ret.push(i);
                }
            } else {
                for (i = start; i >= end; i -= increment) {
                    ret.push(i);
                }
            }
            
            return ret;
        };
    }
}());