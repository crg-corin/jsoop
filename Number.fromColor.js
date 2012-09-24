/**
 * rgb(0-255, 0-255, 0-255)
 * rgba(0-255, 0-255, 0-255, 0-1)
 * /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i
 * #AC2
 * /^#([0-9a-f]{3})$/i
 * #ABC123
 * /^#([0-9a-f]{6})$/i
 * 
 * TODO:
 * hsl() ?!
 * hsla() ?!
 */
(function () {
    "use strict";
    if (!Number.fromColor) {
        Number.fromColor = function (color) {
            var n,
                res,
                r,
                g,
                b;
            if (String.isString(color) & isNaN(color)) {
                if (/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.test(color)) {
                    //is rgb() format
                    res = color.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
                    r = +res[1];
                    g = +res[2];
                    b = +res[3];
                } else if (/^#([0-9a-f]{3})$/i.test(color)) {
                    //is #ABC format
                    res = color.match(/^#([0-9a-f]{3})$/i)[1];
                    r = parseInt(res.charAt(0) + res.charAt(0), 16);
                    g = parseInt(res.charAt(1) + res.charAt(1), 16);
                    b = parseInt(res.charAt(2) + res.charAt(2), 16);
                } else if (/^#([0-9a-f]{6})$/i.test(color)) {
                    //is #ABCDEF format
                    res = color.match(/^#([0-9a-f]{6})$/i)[1];
                    r = parseInt(res.substr(0, 2), 16);
                    g = parseInt(res.substr(2, 2), 16);
                    b = parseInt(res.substr(4, 2), 16);
                } else {
                    throw new Error('"color" must be a number, or in rgb() format, or in HEX format.');
                }
                
                r = r.bound(0, 0xFF) << 16;
                g = g.bound(0, 0xFF) <<  8;
                b = b.bound(0, 0xFF) <<  0;
                n = r | g | b;
            }
            n = +n;
            n &= 0xFFFFFF;
            return n;
        };
    }
}());