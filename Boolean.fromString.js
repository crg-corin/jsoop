(function () {
    "use strict";
    if (!Boolean.fromString) {
        Boolean.fromString = function (str) {
            str = String(str);
            if (/true/i.test(str)) {
                return true;
            } else if (/false/i.test(str)) {
                return false;
            } else {
                return null;
            }
        };
    }
}());