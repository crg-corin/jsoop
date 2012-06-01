(function () {
    "use strict";
    if (!Object.fromPath) {
        Object.fromPath = function (context, path) {
            var keys,
                i,
                l,
                result;
            //if called as `Object.fromPath('foo.bar.baz')`, assume `window` as context
            if (arguments.length < 2) {
                path = context;
                context = window;
            }
            result = context;
            keys = String(path).split('.');
            for (i = 0, l = keys.length; i < l && result != null; i++) {
                result = result[keys[i]];
            }
            return result;
        };
    }
}());