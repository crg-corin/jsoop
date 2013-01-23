(function (root) {
    "use strict";
    var CSV;
    
    function passthrough(r, c, v) {
        return v;
    }
    
    CSV = {
        parse: function (csv, reviver) {
            var chars,
                c,
                charCount,
                start,
                end,
                table,
                row;
            //split the csv data into an array of characters
            //allows for cross-browser array-access
            chars = csv.split('');
            //set the current character
            c = 0;
            //get the total number of characters
            charCount = chars.length;
            //instantiate the table as an array
            table = [];
            //set the reviver if one wasn't passed
            reviver = reviver || passthrough;
            //while there are more characters in the csv data...
            while (c < charCount) {
                //create a new row
                row = [];
                //add it to the table
                table.push(row);
                //while there are more characters that are not newlines...
                while (c < charCount && !/[\r\n]/.test(chars[c])) {
                    //set the start and end positions to the current position
                    start = end = c;
                    //if the current character is a quote...
                    if ('"' === chars[c]) {
                        //increment the current position
                        c += 1;
                        //set the start and end positions to the current position
                        start = end = c;
                        //while there are more characters in the csv data... [a]
                        while (c < charCount) {
                            //if the current character is a quote...
                            if ('"' === chars[c]) {
                                //...and the next character is not a quote
                                if ('"' !== chars[c + 1]) {
                                    //jump out of the loop [a]
                                    break;
                                } else {
                                    //otherwise, unescape the double quote by incrementing the current position...
                                    c += 1;
                                    //and clearing its value
                                    chars[c] = '';
                                }
                            }
                            //increment the current position
                            c += 1;
                            //and set the end position to the current position
                            end = c;
                        }
                        //if the current character is a quote
                        if ('"' === chars[c]) {
                            //increment the current position
                            c += 1;
                        }
                        //while there are more characters that are not newlines or commas
                        while (c < charCount && !/[\r\n,]/.test(chars[c])) {
                            //increment the current position
                            c += 1;
                        }
                    } else {
                        //if the current character is not a quote
                        //while there are more characters that are not newlines or commas...
                        while (c < charCount && !/[\r\n,]/.test(chars[c])) {
                            //increment the current position
                            c += 1;
                            //and set the end position to the current position
                            end = c;
                        }
                    }
                    //pass the current column, current row, and raw value to the reviver function,
                    //and add it to the row
                    row.push(reviver(table.length-1, row.length, chars.slice(start, end).join('')));
                    //if the current character is a comma...
                    if (',' === chars[c]) {
                        //increment the current position
                        c += 1;
                    }
                }
                //if the current character is a newline...
                if (/[\r\n]/.test(chars[c])) {
                    //increment the current position
                    c += 1;
                }
            }
            //return the resultant table
            return table;
        },
        stringify: function () {
            
        }
    };
    root.CSV = CSV;
}(this));

/**
 * http://stackoverflow.com/a/12785546/497418
 */
/* original
var CSV = {
parse: function(csv, reviver) {
    reviver = reviver || function(r, c, v) { return v; };
    var chars = csv.split(''), c = 0, cc = chars.length, start, end, table = [], row;
    while (c < cc) {
        table.push(row = []);
        while (c < cc && '\r' !== chars[c] && '\n' !== chars[c]) {
            start = end = c;
            if ('"' === chars[c]){
                start = end = ++c;
                while (c < cc) {
                    if ('"' === chars[c]) {
                        if ('"' !== chars[c+1]) { break; }
                        else { chars[++c] = ''; } // unescape ""
                    }
                    end = ++c;
                }
                if ('"' === chars[c]) { ++c; }
                while (c < cc && '\r' !== chars[c] && '\n' !== chars[c] && ',' !== chars[c]) { ++c; }
            } else {
                while (c < cc && '\r' !== chars[c] && '\n' !== chars[c] && ',' !== chars[c]) { end = ++c; }
            }
            row.push(reviver(table.length-1, row.length, chars.slice(start, end).join('')));
            if (',' === chars[c]) { ++c; }
        }
        if ('\r' === chars[c]) { ++c; }
        if ('\n' === chars[c]) { ++c; }
    }
    return table;
},

stringify: function(table, replacer) {
    replacer = replacer || function(r, c, v) { return v; };
    var csv = '', c, cc, r, rr = table.length, cell;
    for (r = 0; r < rr; ++r) {
        if (r) { csv += '\r\n'; }
        for (c = 0, cc = table[r].length; c < cc; ++c) {
            if (c) { csv += ','; }
            cell = replacer(r, c, table[r][c]);
            if (/[,\r\n"]/.test(cell)) { cell = '"' + cell.replace(/"/g, '""') + '"'; }
            csv += (cell || 0 === cell) ? cell : '';
        }
    }
    return csv;
}
};
*/