/**
 * Number.prototype.bound
 * Number.fromColor
 */
(function () {
    "use strict";
    if (!Math.clerp) {
        //color linear interpolation
        Math.clerp = function (x, y, n) {
            var xr,
                xg,
                xb,
                yr,
                yg,
                yb,
                dr,
                dg,
                db,
                r,
                g,
                b,
                c;
            x = Number.fromColor(x);
            y = Number.fromColor(y);
            n = +n;
            xr = (0xFF0000 & x) >> 16; //x's red byte
            xg = (0x00FF00 & x) >>  8; //x's green byte
            xb = (0x0000FF & x) >>  0; //x's blue byte
            yr = (0xFF0000 & y) >> 16; //y's red byte
            yg = (0x00FF00 & y) >>  8; //y's green byte
            yb = (0x0000FF & y) >>  0; //y's blue byte
            dr = yr - xr; //delta red byte
            dg = yg - xg; //delta green byte
            db = yb - xb; //delta blue byte
            r = dr * n + xr;
            g = dg * n + xg;
            b = db * n + xb;
            r = r.bound(0, 0xFF) << 16;
            g = g.bound(0, 0xFF) <<  8;
            b = b.bound(0, 0xFF) <<  0;
            c = r | g | b;
            return c;
        };
    }
}());
//Number.prototype.toColorString();