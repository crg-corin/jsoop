/**
 * @dependencies
 * Number
 * String
 * TypeError
 * Math.floor
 * Math.ceil
 * 
 * @dependents
 * 
 * @param withVal
 * a boolean specifying whether to include the number as a prefix to the ordinal
 * 
 * @return String
 * returns the ordinal value of the specified number with decimal places removed.
 * if withVal is provided and true, returns the number with the ordinal value
 */
(function () {
    "use strict";
    if (!Number.prototype.toOrdinal) {
        Number.prototype.toOrdinal = function (withVal) {
            var prefix,
                t;
            if (this === null || this === undefined) {
                throw new TypeError('this is null or not defined');
            }
            t = Number(this);
            if (isNaN(t)) {
                throw new TypeError('this is not a number');
            }
            if (!isFinite(t)) {
                throw new TypeError('this is not a finite number');
            }
            t = t > 0 ? Math.floor(t) : Math.ceil(t);
            prefix = withVal ? String(t) : '';
            switch (t % 100) {
                case 11:
                case 12:
                case 13:
                    return prefix + 'th';
            }
            switch (t % 10) {
                case 1:
                    return prefix + 'st';
                case 2:
                    return prefix + 'nd';
                case 3:
                    return prefix + 'rd';
                default:
                    return prefix + 'th';
            }
        };
    }
}());


if (!Number.prototype.toOrdinal) {
  Number.prototype.toOrdinal = function (withVal) {
    "use strict";
    var prefix;
    prefix = withVal ? this.toString() : '';
    switch (this % 100) {
      case 11:
      case 12:
      case 13:
        return prefix + 'th';
    }
    switch (this % 10) {
      case 1:
        return prefix + 'st';
      case 2:
        return prefix + 'nd';
      case 3:
        return prefix + 'rd';
      default:
        return prefix + 'th';
    }
  };
}