(function () {
    "use strict";
    function r(n, name) {
        if (!isFinite(n)) {
            throw new RangeError('"' + name + '" must be between Number.MIN_VALUE and Number.MAX_VALUE');
        }
    }
    
    if (!Number.range) {
        Number.range = function (begin, end, step) {
            var i,
                ret;
            switch (arguments.length) {
                case 0:
                    throw new Error('Number.range requires at least one argument');
                    break;
                case 1:
                    step = 1;
                    end = begin;
                    begin = 0;
                    break;
                case 2:
                    step = 1;
                    break;
            }
            r(begin, 'begin');
            r(end, 'end');
            r(step, 'step');
            if (!step) {
                throw new RangeError('"step" must not be 0');
            }
            ret = [];
            for (i = begin; i < end; i += step) {
                ret.push(i);
            }
            return ret;
        };
    }
}());