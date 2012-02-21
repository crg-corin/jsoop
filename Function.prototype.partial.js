(function () {
    "use strict";
    if (!Function.prototype.partial) {
        Function.prototype.partial = function () {
            var fn,
                argmts;
            fn = this;
            argmts = arguments;
            return function () {
                var arg,
                    i,
                    args;
                args = Array.prototype.slice.call(argmts);
                console.log(args);
                for (i = arg = 0; i < args.length && arg < arguments.length; i++) {
                    if (args[i] === undefined) {
                        args[i] = arguments[arg++];
                    }
                }
                return fn.apply(this, args);
            };
        };
    }
}());