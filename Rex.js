(function (w) {
    "use strict";
    //characterSetEscape purposefully does _not_ escape the hyphen character (-).
    //this is to allow `Rex.prototype.chars` the ability to accept character ranges
    //such as `a-z`.
    function characterSetEscape(str) {
        return ('' + str).replace(/[\]\\^]/g, '\\$&');
    }
    function regexEscape(str) {
        return ('' + str).replace(/[\/\\[\](){}?+*|.^$]/g, '\\$&');
    }
    
    function Rex(args) {
        if (!(this instanceof Rex)) {
            return new Rex(args);
        }
        
        this._rex = [];
        this._flags = {
            g: false,
            i: false,
            m: false
        };
        this._level = 0;
    }
    Rex.prototype = {
        _getFlags: function () {
            var ret;
            ret = '';
            if (this._flags.g) {
                ret += 'g';
            }
            if (this._flags.i) {
                ret += 'i';
            }
            if (this._flags.m) {
                ret += 'm';
            }
            return ret;
        },
        boundary: function (b) {
            if (!arguments.length) {
                b = true;
            }
            this._rex.push(b ? '\\b' : '\\B');
            return this;
        },
        //Note: if the `-` character must be matched, it must be listed last.
        chars: function (args, include) {
            if (arguments.length < 2) {
                include = true;
            }
            args = characterSetEscape(args);
            this._rex.push('[' + (include ? '' : '^') + args + ']');
            return this;
        },
        compile: function () {
            var pattern,
                flags;
            if (this._level) {
                throw new Error('There are ' + this._level + ' open groups that must be closed.');
            }
            pattern = '' + this;
            flags = this._getFlags();
            return new RegExp(pattern, flags);
        },
        digit: function (d) {
            if (!arguments.length) {
                d = true;
            }
            this._rex.push(d ? '\\d' : '\\D');
            return this;
        },
        end: function () {
            if (!this._level) {
                throw new Error('No groups have been started. Use "followedBy" or "group" to start a group.');
            }
            this._rex.push(')');
            this._level -= 1;
            return this;
        },
        finish: function () {
            this._rex.push('$');
            return this;
        },
        followedBy: function (f) {
            if (!arguments.length) {
                f = true;
            }
            this._rex.push(f ? '(?=' : '(?!');
            this._level += 1;
            return this;
        },
        global: function (g) {
            if (!arguments.length) {
                g = true;
            }
            this._flags.g = !!g;
            return this;
        },
        group: function (capture) {
            if (!arguments.length) {
                capture = true;
            }
            this._rex.push('(' + (capture ? '' : '?:'));
            this._level += 1;
            return this;
        },
        ignoreCase: function (i) {
            if (!arguments.length) {
                i = true;
            }
            this._flags.i = !!i;
            return this;
        },
        maybe: function () {
            this._rex.push('?');
            return this;
        },
        multiline: function (m) {
            if (!arguments.length) {
                m = true;
            }
            this._flags.m = !!m;
            return this;
        },
        or: function () {
            this._rex.push('|');
            return this;
        },
        reference: function (n) {
            n = n >>> 0;
            if (!isFinite(n) || n < 1) {
                throw new Error('"n" must be a finite integer greater than zero.')
            }
            this._rex.push('\\' + n);
            return this;
        },
        repeat: function (n, m) {
            //.repeat()             -> *
            //.repeat(false)        -> *
            //.repeat(true)         -> +
            //.repeat(3)            -> {1}
            //.repeat(3,5)          -> {3,5}
            //.repeat(5, Infinity)  -> {5,}
            //.repeat(-1)           -> ERROR
            //.repeat(5,3)          -> ERROR
            //.repeat(NaN)          -> ERROR    
            switch (arguments.length) {
            case 0:
                this._rex.push('*');
                break;
            case 1:
                if (n === !!n) {
                    this._rex.push(n ? '+' : '*');
                    return this;
                }
                n = +n;
                if (!w.isFinite(n)) {
                    throw new Error('"n" must be a boolean or finite integer when called with only one parameter.');
                }
                if (n <= 0) {
                    throw new Error('"n" must be greater than zero when called with only one parameter.');
                }
                n = n >>> 0;
                this._rex.push('{' + n + '}');
                break;
            default:
                n = +n;
                m = +m;
                if (!w.isFinite(n)) {
                    throw new Error('"n" must be a finite integer when called with two parameters.');
                }
                if (n < 0) {
                    throw new Error('"n" must be greater than or equal to zero when called with two parameters.');
                }
                if (isNaN(m)) {
                    throw new Error('"m" must be a number.');
                }
                if (n >= m) {
                    throw new Error('"m" must be greater than "n".');
                }
                
                this._rex.push('{' + n + ',' + (w.isFinite(m) ? m : '') + '}');
                break;
            }
            return this;
        },
        space: function (s) {
            if (!arguments.length) {
                s = true;
            }
            this._rex.push(s ? '\\s' : '\\S');
            return this;
        },
        start: function () {
            this._rex.push('^');
            return this;
        },
        text: function (args) {
            args = regexEscape(args);
            this._rex.push(args);
            return this;
        },
        toString: function () {
            return this._rex.join('');
        },
        word: function (w) {
            if (!arguments.length) {
                w = true;
            }
            this._rex.push(w ? '\\w' : '\\W');
            return this;
        }
    };
    w.Rex = Rex;
}(this));