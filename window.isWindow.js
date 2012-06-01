/**
 * @notes
 * This function is fast, but inaccurate. Setting `window.self = null` will return `false` for `isWindow(window)`
 * Additionally, `var foo = {}; foo.self = foo;` will return `true` for `isWindow(foo)`
 */
(function () {
    "use strict";
    //fast but fails
    if (!window.isWindow) {
        window.isWindow = function (arg) {
            return 'self' in arg && arg.self === arg;
        };
    }
    //set it and forget it
    var wStr = Object.prototype.toString.call(window);
    if (!window.isWindow) {
        switch (wStr) {
        case '[object DOMWindow]':
        case '[object Window]':
        case '[object global]':
            window.isWindow = function (arg) {
                return Object.prototype.toString.call(arg) === wStr;
            };
            break;
        default:
            window.isWindow = function (arg) {
                var e,
                    self,
                    hasSelf;
                if ('self' in arg) {
                    hasSelf = arg.hasOwnProperty('self');
                    try {
                        if (hasSelf) {
                            self = arg.self;
                        }
                        delete arg.self;
                        if (hasSelf) {
                            arg.self = self;
                        }
                    } catch (e) {
                        return true;
                    }
                }
                return false;
            };
            break;
        }
    }
    //recheck every call
    if (!window.isWindow) { //will never be set, but may be more accurate
        window.isWindow = function (arg) {
            var e,
                str,
                self,
                hasSelf;
            
            str = Object.prototype.toString.call(arg);
            switch (wStr) {
            case '[object DOMWindow]':
            case '[object Window]':
            case '[object global]':
                return str === wStr;
            }
            if ('self' in arg) {
                hasSelf = arg.hasOwnProperty('self');
                try {
                    if (hasSelf) {
                        self = arg.self;
                    }
                    delete arg.self;
                    if (hasSelf) {
                        arg.self = self;
                    }
                } catch (e) {
                    return true;
                }
            }
            return false;
        };
    }
}());