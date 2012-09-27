(function () {
    "use strict";
    if (!Object.fromPath) {
        Object.fromPath = function (context, path) {
            var result,
                keys,
                i;
            //if called as `Object.fromPath('foo.bar.baz')`,
            //assume `window` as context
            if (arguments.length < 2) {
                path = context;
                context = window;
            }
            //start at the `context` object
            result = context;
            //break the path on `.` characters
            keys = String(path).split('.');
            //`!= null` is being used to break out of the loop
            //if `null` or `undefined are found
            for (i = 0; i < keys.length && result != null; i+= 1) {
                //iterate down the path, getting the next part
                //of the path each iteration
                result = result[keys[i]];
            }
            //return the object as described by the path,
            //or null or undefined if they occur anywhere in the path
            return result;
        };
    }
}());