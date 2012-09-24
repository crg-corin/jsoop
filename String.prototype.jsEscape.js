(function () {
    "use strict";
    if (!String.prototype.jsEscape) {
        String.prototype.jsEscape = function () {
            var str,
                ret,
                i,
                c,
                n,
                a;
            for (i = 0, ret = '', str = '' + this; i < str.length; i += 1) {
                c = str.charAt(i);
                switch (c) {
                case '\'':
                    ret += '\\\'';
                    break;
                case '\"':
                    ret += '\\\"';
                    break;
                case '\\':
                    ret += '\\\\';
                    break;
                case '\b':
                    ret += '\\b';
                    break;
                case '\f':
                    ret += '\\f';
                    break;
                case '\n':
                    ret += '\\n';
                    break;
                case '\r':
                    ret += '\\r';
                    break;
                case '\t':
                    ret += '\\t';
                    break;
                default:
                    n = c.charCodeAt(0);
                    if (n < 32 || n > 127) {
                        a = n.toString(16);
                        while (a.length < 4) {
                            a = '0' + a;
                        }
                        ret += '\\u' + a;
                    } else {
                        ret += c;
                    }
                    break;
                }
            }
            return ret;
        };
    }
}());