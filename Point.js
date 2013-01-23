(function (root) {
    "use strict";
    function Point(x, y, z) {
        switch (arguments.length) {
        case 0:
            x = 0;
            //continue;
        case 1:
            y = 0;
            //continue;
        case 2:
            z = 0;
            //continue;
        }
        if (!(this instanceof Point)) {
            return new Point(x, y, z);
        }
        this.x = +x;
        this.y = +y;
        this.z = +z;
    }
    Point.prototype = {
        add: function (/*p1, p2, p3*/) {
            var p,
                i;
            p = this.clone();
            p.addTo.apply(p, arguments);
            return p;
        },
        addTo: function (/* p1, p2, p3 */) {
            var p,
                i;
            for (i = 0; i < arguments.length; i += 1) {
                p = arguments[i];
                this.x += p.x;
                this.y += p.y;
                this.z += p.z;
            }
            return this;
        },
        get angle() {
            return Math.atan2(this.y, this.x);
        },
        set angle(val) {
            var x,
                y;
            x = this.x * Math.cos(val) - this.y * Math.sin(val);
            y = this.x * Math.sin(val) + this.y * Math.cos(val);
            this.x = x;
            this.y = y;
        },
        clone: function () {
            return new Point(this.x, this.y, this.z);
        },
        copyFrom: function (p) {
            if (!(p instanceof Point) && root.console) {
                console.warn('A non-Point object is being copied into a Point');
            }
            this.x = +p.x;
            this.y = +p.y;
            this.z = +p.z;
            return this;
        },
        cross: function (p) {
            return Point.crossProduct(this, p);
        },
        distance: function (p) {
            return Point.distance(this, p);
        },
        distanceSquared: function (p) {
            return Point.distanceSquared(this, p);
        },
        dot: function (p) {
            return Point.dotProduct(this, p);
        },
        get length() {
            return Math.sqrt(this.lengthSquared);
        },
        set length(val) {
            var ratio;
            ratio = val / this.length;
            this.x *= ratio;
            this.y *= ratio;
            this.z *= ratio;
        },
        get lengthSquared() {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        },
        normalize: function (a) {
            var p;
            if (!arguments.length) {
                a = 1;
            }
            a = +a;
            p = this.clone();
            p.length = a;
            return p;
        },
        offset: function (x, y, z) {
            switch (arguments.length) {
            case 0:
                this.x += x;
                //continue;
            case 1:
                this.y += y;
                //continue;
            case 2:
                this.z += z;
                //continue;
            }
            return this;
        },
        rotate2D: function (rad, deg) {
            if (deg) {
                rad = rad * Math.PI / 180;
            }
            
        },
        scale: function (a) {
            var p;
            p = this.clone();
            p.length *= a;
            return p;
        },
        scaleBy: function (a) {
            this.length *= a;
            return this;
        },
        set: function (x, y, z) {
            switch (arguments.length) {
            case 0:
                this.x = +x;
                //continue;
            case 1:
                this.y = +y;
                //continue;
            case 2:
                this.z = +z;
                //continue;
            }
            return this;
        },
        subtract: function (/* p1, p2, p3 */) {
            var p;
            p = this.clone();
            p.subtractFrom.apply(p, arguments);
            return p;
        },
        subtractFrom: function (/* p1, p2, p3 */) {
            var p,
                i;
            for (i = 0; i < arguments.length; i += 1) {
                p = arguments[i];
                this.x -= p.x;
                this.y -= p.y;
                this.z -= p.z;
            }
            return this;
        },
        toString: function () {
            return JSON.stringify(this);
        }
    };
    
    Point.dotProduct = function (p, q) {
        return p.x * q.x + p.y * q.y + p.z * q.z;
    };
    
    Point.crossProduct = function (p, q) {
        return new Point(
            p.y * q.z - p.z * q.y,
            p.z * q.x - p.x * q.z,
            p.x * q.y - p.y * q.x
        );
    };
    
    Point.distance = function (p, q) {
        return p.subtract(q).length;
    };
    
    Point.distanceSquared = function (p, q) {
        return p.subtract(q).lengthSquared;
    };
    
    Point.interpolate = function (p, q, f) {
        //delta p, q * f + p
        var d;
        d = q.subtract(p);
        d.length *= f;
        return p.add(d);
    };
    
    Point.polar = function (r, theta, deg) {
        if (deg) {
            theta *= Math.PI / 180;
        }
        r = +r;
        return new Point(
            r * Math.cos(theta),
            r * Math.sin(theta),
            0
        );
    };
    
    root.Point = Point;
}(this));