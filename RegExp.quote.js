//http://stackoverflow.com/a/2593661/497418
(function () {
    "use strict";
    if (!RegExp.quote) {
        RegExp.quote = function (str) {
            return (''+str).replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
        };
    }
}());