/**
 * @dependencies
 * String
 * String.prototype.replace
 * String.fromCharCode
 * TypeError
 * 
 * @dependents
 * 
 * @param
 * 
 * @return String
 * returns the html decoded string
 */
(function (charCode, undefined) {
    "use strict";
    var entities,
        entityPattern;
    function entityRepresentation(match, hex, num, entity) {
        if (hex !== undefined) {
            num = parseInt(hex, 16);
            return charCode(num);
        } else if (num !== undefined) {
            return charCode(num);
        } else if (entity !== undefined && entities.hasOwnProperty(entity)) {
            return entities[entity];
        }
        return match;
    }
    entityPattern = /&(?:#x([0-9a-f]+)|#(\d+)|([0-9a-z]+))(?:;|(?=&))/gi;
    entities = {
        'amp': '&',
        'quot': '"',
        'lt': '<',
        'gt': '>',
        'apos': '\''
        //add more another time
    };
    
    if (!String.prototype.decodeHTML) {
        String.prototype.decodeHTML = function () {
            if (this === null || this === undefined) {
                throw new TypeError('"this" is null or not defined');
            }
            return String(this).replace(entityPattern, entityRepresentation);
        };
    }
}(String.fromCharCode));