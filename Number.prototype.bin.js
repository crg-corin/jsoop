(function (slice) {
    "use strict";
    if (!Number.prototype.bin) {
        Number.prototype.bin = function (/* arg1, arg2, arg3, ... */) {
            var val,
                args,
                arg,
                lastArg,
                i;
            val = +this;
            args = slice.call(arguments);
            lastArg = null;
            for (i = 0; i < args.length; i += 1) {
                arg = args[i] = +args[i];
                if (isNaN(arg)) {
                    throw new Error('All parameters must be Numbers.');
                }
                if (lastArg !== null && arg <= lastArg) {
                    throw new Error('All parameters must be sorted consecutively without repetition.');
                }
                lastArg = arg;
            }
            
            for (i = 0; i < args.length; i += 1) {
                if (val < args[i]) {
                    return i;
                }
            }
            return i;
        };
    }
}(Array.prototype.slice));