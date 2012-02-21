(function () {
    "use strict";
    if (!Function.prototype.curry) {
        Function.prototype.curry = function () {
            var args,
                self;
            self = this;
            args = Array.prototype.slice.call(arguments);
            return function () {
                return self.apply(this, args.concat(
                    Array.prototype.slice.call(arguments)
                ));
            };
        };
    }
}());