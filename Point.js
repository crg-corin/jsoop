(function (w) {
    "use strict";
    function Point(x, y, z) {
        if (!(this instanceof Point)) {
            return new Point(x, y, z);
        }
        this.x = n(x);
        this.y = n(y);
        this.z = n(z);
    }
    Point.prototype = {
        add: function () {
            var a,
                i,
                l,
                p;
            p = this.clone();
            for (i = 0, l = arguments.length; i < l; i++) {
                a = arguments[i];
                p.x += n(a.x);
                p.y += n(a.y);
                p.z += n(a.z);
            }
            return p;
        },
        addTo: function () {
            var i,
                l,
                p;
            for (i = 0, l = arguments.length; i < l; i++) {
                p = arguments[i];
                this.x += n(p.x);
                this.y += n(p.y);
                this.z += n(p.z);
            }
        },
        clone: function () {
            return new Point(this.x, this.y, this.z);
        },
        copyFrom: function (p) {
            this.x = n(p.x);
            this.y = n(p.y);
            this.z = n(p.z);
        },
        cross: function (p) {
            var a1,
                a2,
                a3,
                b1,
                b2,
                b3;
            a1 = this.x;
            a2 = this.y;
            a3 = this.z;
            b1 = n(p.x);
            b2 = n(p.y);
            b3 = n(p.z);
            return new Point(
                a2 * b3 - a3 * b2,
                a3 * b1 - a1 * b3,
                a1 * b2 - a2 * b1);
        },
        distance: function (p) {
            var dx,
                dy,
                dz;
            dx = this.x - n(p.x);
            dy = this.y - n(p.y);
            dz = this.z - n(p.z);
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        },
        distanceSquared: function (p) {
            var dx,
                dy,
                dz;
            dx = this.x - n(p.x);
            dy = this.y - n(p.y);
            dz = this.z - n(p.z);
            return dx * dx + dy * dy + dz * dz;
        },
        dot: function (p) {
            return this.x * n(p.x) + this.y * n(p.y) + this.z * n(p.z);
        },
        equals: function (p, d) {
            if (arguments.length < 2) {
                return (this.x === p.x) && (this.y === p.y) && (this.z === p.z);
            } else {
                return this.distance(p) < d;
            }
        },
        length: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },
        lengthSquared: function () {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        },
        normalize: function (a) {
            var b,
                l,
                p;
            l = this.length() || 1;
            b = a / l;
            p = this.clone();
            p.x *= b;
            p.y *= b;
            p.z *= b;
            return p;
        },
        offset: function (x, y, z) {
            this.x += n(x);
            this.y += n(y);
            this.z += n(z);
        },
        scale: function (a) {
            a = n(a);
            return new Point(this.x * a, this.y * a, this.z * a);
        },
        scaleBy: function (a) {
            a = n(a);
            this.x *= a;
            this.y *= a;
            this.z *= a;
        },
        setTo: function (x, y, y) {
            this.x = n(x);
            this.y = n(y);
            this.z = n(z);
        },
        subtract: function () {
            var a,
                i,
                l,
                p;
            p = this.clone();
            for (i = 0, l = arguments.length; i < l; i++) {
                a = arguments[i];
                p.x -= n(a.x);
                p.y -= n(a.y);
                p.z -= n(a.z);
            }
            return p;
        },
        subtractFrom: function () {
            var i,
                l,
                p;
            for (i = 0, l = arguments.length; i < l; i++) {
                p = arguments[i];
                this.x -= n(p.x);
                this.y -= n(p.y);
                this.z -= n(p.z);
            }
        },
        toString: function () {
            return '{"x":' + this.x + ',"y":' + this.y + ',"z":' + this.z + '}';
        },
        valueOf: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
    };
    Point.dotProduct = function (p, q) {
        return n(p.x) * n(q.x) + n(p.y) * n(q.y) + n(p.z) * n(q.z);
    };
    Point.crossProduct = function (p, q) {
        var a1,
            a2,
            a3,
            b1,
            b2,
            b3;
        a1 = n(p.x);
        a2 = n(p.y);
        a3 = n(p.z);
        b1 = n(q.x);
        b2 = n(q.y);
        b3 = n(q.z);
        return new Point(
            a2 * b3 - a3 * b2,
            a3 * b1 - a1 * b3,
            a1 * b2 - a2 * b1);
    };
    Point.distance = function (p, q) {
        var dx,
            dy,
            dz;
        dx = n(p.x) - n(q.x);
        dy = n(p.y) - n(q.y);
        dz = n(p.z) - n(q.z);
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };
    Point.distanceSquared = function (p, q) {
        var dx,
            dy,
            dz;
        dx = n(p.x) - n(q.x);
        dy = n(p.y) - n(q.y);
        dz = n(p.z) - n(q.z);
        return dx * dx + dy * dy + dz * dz;
    };
    Point.interpolate = function (p, q, f) {
        var dx,
            dy,
            dz,
            px,
            py,
            pz;
        px = n(p.x);
        py = n(p.y);
        pz = n(p.z);
        dx = n(q.x) - px;
        dy = n(q.y) - py;
        dz = n(q.z) - pz;
        f = n(f);
        return new Point(px + dx * f, py + dy * f, pz + dz * f);
    };
    //2D polar coordinates
    Point.polar = function (r, theta, deg) {
        if (deg) {
            theta = theta * Math.PI / 180;
        }
        r = n(r);
        return new Point(r * Math.cos(theta), r * Math.sin(theta), 0);
    };
    
    function n(a) {
        return Number(a) || 0;
    }
    w.Point = Point;
}(window));