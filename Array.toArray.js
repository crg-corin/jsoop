(function () {
    if (!Array.toArray) {
        Array.toArray = function (arg) {
            if (arg === null || arg === undefined) {
                return [];
            }
            return Array.prototype.slice.call(arg);
        };
    }
}());